---
title: Predicting Solar Flare Intensity with Satellite Imagery
summary: Compared five CNN architectures on solar observatory imagery to predict flare magnitude before flares reach Earth, so infrastructure and satellite operators get earlier warning.
category: software
org: ucsd-course
year: "2023"
role: "Project scoping, data sourcing, report author (team of 3)"
teamSize: 3
tools: [Python, PyTorch, CNNs, DataLoader pipelines]
featured: true
links:
  - { label: "Code + full report", url: "https://github.com/ZCandont/solar-flare-cnn" }
---

Team project for UCSD ECE 228 (Machine Learning for Physical Applications), with Aadhar Sharma and Ehson Pirouzian. Per the report's contribution statement, Ehson built and trained the models, Aadhar handled data processing and assisted with the model code, and I did the data search and wrangling, wrote the presentation and was the main report author. Overall contributions were equal.

## Spotted

A solar flare's magnitude is reported on a log scale from `e^-3` (largest flare in a decade) to `e^-9` (negligible), and high-intensity flares can damage power grids and satellites and expose astronauts to radiation. The team wanted a machine learning problem with a real physical stake, so we searched datasets published by government agencies and found the SDO Benchmark, built from NASA's Solar Dynamics Observatory imagery: images at 10 wavelengths, at 4 time points before each flare, labeled with the flare's eventual magnitude. The question: can a model predict a flare's magnitude from the images that come before it?

<figure>
<img src="/images/projects/solar-flare/solar-samples.png" alt="Ten small solar observatory images of the same region of the sun in different wavelengths, shown in a teal and yellow color map" loading="lazy">
<figcaption>Example set of solar observatory images before a flare. Each sample stacks 10 of these per time point, at 4 time points.</figcaption>
</figure>

## Root cause

Each sample is shaped `(4 time steps, 10 channels, 256, 256)`, far too large for any of our machines to hold in memory at once. That, not model choice, was the real bottleneck: batching and out-of-core data loading (PyTorch `DataLoader` and `TensorDataset`, later an iterative loader that streamed from disk each epoch) had to work before any architecture comparison meant anything. It also capped how much data we could use: the number of samples depended on the RAM of whichever machine ran the code.

## Plan

Compare architectures head to head on the same 80/20 train/validation split of the log-scaled targets: a baseline CNN built from scratch, an optimized version with more convolution, pooling and fully connected layers plus ReLU activations, a 3D CNN treating time as a third dimension, and established PyTorch architectures (AlexNet and ResNet, modified, with a VGG16 run alongside). Low learning rates, weight decay of 0.01 and many epochs, because the data is complex and overfitting was the main risk.

## Iterations

- **Combining four time steps into one prediction.** We tried three ways to turn four per-image outputs into one target: a loss on each image separately, averaging the outputs, and a learned linear weighting layer. The first two beat the linear layer, likely because a single linear layer cannot express the relationships between time steps.
- **Simplifying the input.** We tried thresholding the images at grayscale 190 to give the models simpler binary inputs. It did not improve results, so we dropped it.
- **Baseline CNN.** It overfit quickly: training loss kept falling toward 1 while validation loss bottomed out near 8 within about 15 epochs and then climbed back toward 10.
- **Optimized CNN.** More layers cut epoch time and lowered validation loss slightly, to about 7 over 250 epochs, but the gap to the training loss stayed large.
- **AlexNet.** The best of the set: validation loss reached about 6 with a steady downward trend, while training loss fell to about 1. It was also the simplest of the pre-built networks, which mattered because our images are detailed and prone to overfitting.
- **ResNet and VGG16.** ResNet's validation loss and learning were worse than AlexNet's, and VGG16 was a poor fit, so adding depth did not help on a dataset this small.

<figure>
<img src="/images/projects/solar-flare/baseline-loss.png" alt="Baseline CNN loss curves: training loss falls steadily while validation loss flattens near 8 and rises to about 10" loading="lazy">
<figcaption>Baseline CNN: training loss keeps falling while validation loss stalls and rises, a sign of overfitting.</figcaption>
</figure>

<figure>
<img src="/images/projects/solar-flare/optimized-loss.png" alt="Optimized CNN loss curves over 250 epochs: validation loss ends near 7 while training loss falls to about 1" loading="lazy">
<figcaption>Optimized CNN over 250 epochs.</figcaption>
</figure>

<figure>
<img src="/images/projects/solar-flare/alexnet-loss.png" alt="AlexNet loss curves over 250 epochs with a downward trend line: validation loss ends near 6 while training loss falls to about 1" loading="lazy">
<figcaption>Modified AlexNet over 250 epochs, with a trend line through the validation loss.</figcaption>
</figure>

## Proof it's final

AlexNet showed clear learning on the training set and mild learning on the validation set. It could roughly predict the general degree of solar intensity, with the caveat that it was error-prone and made some badly wrong predictions, and the gap between training and validation loss shows it never fully converged. We only trained on 2,676 samples because of memory and compute limits, and the iterative loader that would have used the full dataset took too long to train before the deadline.

What we would change: a learning rate that decays over training, the entire dataset with better hardware, and L1 loss in place of MSE.

## Skills applied to later work

Fighting a dataset too large to fit in memory pushed me into batch processing, incremental (out-of-core) learning and general memory/data optimization, along with adaptive optimizers better suited to large datasets, all of which carried into later machine learning work. Working with 256x256 imagery also surfaced a resolution problem, low-resolution inputs meant real information loss and weaker feature extraction in the CNNs, which pushed me toward super-resolution preprocessing and adaptive-feature approaches (including in TensorFlow) for future model work.
