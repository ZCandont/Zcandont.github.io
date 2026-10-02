---
title: Predicting Composite Properties from Microstructure
summary: ResNets that classify 10 composite microstructure families (17 errors in 1,311 test images) and predict 7 homogenized properties (test R² above 0.9), trained on data too large for memory.
category: software
org: ucsd-course
year: "2026"
role: "Individual project (SE 232 final)"
teamSize: 1
tools: [Python, PyTorch, ResNet, scikit-learn, Google Colab (A100)]
featured: true
cover: "/images/projects/microstructure-ml/p2-parity.jpeg"
coverAlt: "Parity plot of predicted versus true material property"
coverNegative: true
links:
  - { label: "Code + full report", url: "https://github.com/ZCandont/micro2d-microstructure-ml" }
---

Final project for SE 232, UC San Diego, Winter 2026, built on the public MICRO2D microstructure dataset.

## Spotted

Composite materials are heterogeneous, so their effective properties are hard to know, yet finite element analysis and structural health monitoring both depend on them. Representative volume elements (RVEs) let a microstructure be homogenized into effective properties, but that first requires recognizing which microstructure you have and estimating its properties quickly. The project asked for three models on MICRO2D (87,379 two-phase microstructures across 10 families): classify a microstructure's family from its image, predict its 7 homogenized properties (Ex, vxy, Ey, vyx, Gxy, kx, ky) from the image plus its phase parameters, and repeat the regression with rotation augmentation.

## Root cause

Four problems stood between the assignment and a model that worked, and each showed up by getting it wrong first:

- **Scale.** The arrays were too large for RAM, so I memory-mapped them. Memory-mapping from a mounted Google Drive made training crawl, because every read went back to the drive, so the data had to be copied into the Colab runtime's local storage first.
- **Class imbalance.** Some families outnumbered others by wide margins, so the classifier used class weights of N / (C x n) in its loss.
- **Mixed scales.** Ex is many orders of magnitude larger than the Poisson ratio vxy, so targets and material parameters were standardized to keep the large values from dominating the loss.
- **Anisotropy.** The property labels are directional, so rotating an image without rotating its labels would create wrong ground truth.

## Plan

For classification, ResNet-50 with weighted cross-entropy and the Adam optimizer: deep enough to pick up small geometric detail, with residual connections to avoid vanishing gradients. For regression, the shallower ResNet-18, since labeled property values give the network a clearer target. Image features are concatenated with the two phase parameters before the regression head, trained with MSE loss and R², dropout added manually, and learning-rate decay. Every hyperparameter lives in one dictionary so a tuning run is a one-line change.

Verification used several independent checks so a model could not just be emitting plausible numbers: train vs validation loss curves, a separate held-out test set, a confusion matrix for classification, and parity plots for regression. I debugged on the classifier first so the slow regression runs would not need retraining for avoidable bugs.

## Iterations

**Classification.** The first run overfit badly: train loss 0.61 against validation loss 2.49, with a validation curve that barely moved. After debugging and tuning, test loss fell from 2.19 to 0.027. Learning-rate decay at the halfway point removed the large validation spikes.

| Run | Train loss | Validation loss | Test loss |
|---|---|---|---|
| Initial | 0.6067 | 2.4927 | 2.1947 |
| Tuned | 0.0071 | 0.0319 | 0.0272 |

<figure>
<img src="/images/projects/microstructure-ml/p1-initial-loss.png" alt="Classification training and validation loss for the initial run: training loss falls while validation loss stays flat near 2.5" loading="lazy">
<figcaption>Initial run: the model fits the training set but validation loss does not move.</figcaption>
</figure>

<figure>
<img src="/images/projects/microstructure-ml/p1-tuned-loss.png" alt="Classification training and validation loss for the tuned run, with validation spikes disappearing after the learning-rate decay at epoch 30" loading="lazy">
<figcaption>Tuned run: the validation spikes disappear once learning-rate decay kicks in at epoch 30.</figcaption>
</figure>

**Regression.** Test R² stayed between 0.90 and 0.93 across every setting I tried, so the more informative number was the gap between training and test error.

| Run | Train MSE | Validation MSE | Test MSE | Test R² |
|---|---|---|---|---|
| Task 2, initial | 0.0192 | 0.0314 | 0.0746 | 0.9336 |
| Task 2, tuned | 0.0149 | 0.0586 | 0.1113 | 0.9054 |
| Task 3 (augmented), initial | 0.0770 | 0.0800 | 0.0947 | 0.9052 |
| Task 3 (augmented), tuned | 0.0597 | 0.0711 | 0.0966 | 0.9033 |

Tuning task 2 did not improve its test score: cutting weight decay saved time at a small cost in accuracy, and more epochs made things worse because learning-rate decay then landed too late. Rotation augmentation (90, 180 and 270 degrees, with the directional labels rotated to match, quadrupling the training set to 38,400 images) held test R² near 0.90 while cutting the train-to-test MSE ratio from about 7.5x (0.0149 to 0.1113) to about 1.6x (0.0597 to 0.0966). It acted as a regularizer: less memorizing orientation, more learning the physical structure.

## Proof it's final

The classifier misclassified 17 of 1,311 held-out images, and every error is a confusion between VoronoiMedium and VoronoiMediumSpaced.

<figure>
<img src="/images/projects/microstructure-ml/p1-confusion-matrix.png" alt="Confusion matrix of the tuned classifier: a near-perfect diagonal with a few errors between classes 7 and 8" loading="lazy">
<figcaption>Confusion matrix on the held-out test split.</figcaption>
</figure>

Both regression models reach test R² above 0.9. Their parity plots are flatter than the ideal y = x line, meaning predictions cluster toward average values. That is the main limitation, likely caused by noisy inputs and by 2D images standing in for higher-dimensional structures with more physical attributes than the image shows.

<figure>
<img src="/images/projects/microstructure-ml/p2-parity.jpeg" alt="Task 2 parity plot of predicted vs true material property with a dashed ideal fit line" loading="lazy">
<figcaption>Task 2 parity plot.</figcaption>
</figure>

<figure>
<img src="/images/projects/microstructure-ml/p3-parity.jpeg" alt="Task 3 parity plot of predicted vs true material property with a dashed ideal fit line" loading="lazy">
<figcaption>Task 3 parity plot, trained with rotation augmentation.</figcaption>
</figure>

## Next steps

A larger dataset with more input features and true 3D microstructures would attack the regression's regression-to-the-mean directly. Tying the learning-rate decay schedule to the epoch count would remove the coupling that made longer training worse. Per-property error analysis would show which of the 7 properties the model handles poorly, since the parity plots pool all of them.

## Skills applied to later work

Finding the real bottleneck (storage reads, not compute) and building an I/O-aware data pipeline around it. Handling class imbalance and mixed-scale targets deliberately. Multi-modal models that combine image features with engineering parameters. Augmentation that respects the physics, rotating labels with images. Verification habits that catch a model fitting noise. All of it applies directly to machine learning surrogates for structural and composite analysis.
