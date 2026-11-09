---
title: "Wave Forcing"
excerpt: "A streaming video generation system that pipelines chunk denoising across GPU replicas and overlaps KV communication with VAE decoding."
collection: portfolio
link: https://sjtu-deng-lab.github.io/WaveForcing/
github: https://github.com/SJTU-DENG-Lab/WaveForcing
huggingface: https://huggingface.co/SJTU-DENG-Lab/WaveForcing-1.3B
date: 2026-10-31
---

Wave Forcing pipelines chunk denoising and KV-cache refresh so each concurrent forward round emits one video chunk after the pipeline fills. Wave Runtime hides KV delivery behind computation and balances VAE decoding across stages.

Project page: [sjtu-deng-lab.github.io/WaveForcing](https://sjtu-deng-lab.github.io/WaveForcing/)

Code: [github.com/SJTU-DENG-Lab/WaveForcing](https://github.com/SJTU-DENG-Lab/WaveForcing)

Weights: [huggingface.co/SJTU-DENG-Lab/WaveForcing-1.3B](https://huggingface.co/SJTU-DENG-Lab/WaveForcing-1.3B)
