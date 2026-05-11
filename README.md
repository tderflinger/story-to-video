# story-to-video

This is an experiment with an automated pipeline from short story text to video. This project was created during the Runway Hackathon 2026.

## Requirements

- A Runway Developer account with sufficient credits.
- Ollama, but other LLMs could also be used (needed for creation of storyboard scene descriptions).

## Installation

```bash
npm i
```

## Demo

The resulting demo made with the help of the scripts in this
repository can be watched here: 

https://player.mux.com/MUiHW6Ch02n01e1qRWOt2IcDJ32Ywsjo7f00sIv5RPF9WM

## Pipeline

```mermaid
flowchart TD
    A[Get short story]
    A --> B[Use LLM to convert story to storyboard scene descriptions]
    B --> C[For each scene description generate image]
    C --> D[Make short video out of each image]
    D --> E[Generate voiceover from story]
    E --> F[Combine all files to final video with ffmpeg]
```

## Final Combination

Use ffmpeg to combine the separate files (video files and audio files)
into final video.

Example command:

```bash
ffmpeg \
  -i video1.mp4 \
  -i video2.mp4 \
  -i video4.mp4 \
  -i video5.mp4 \
  -i audio1.mp3 \
  -i audio2.mp3 \
  -filter_complex "\
    [0:v:0]tpad=stop_mode=clone:stop_duration=10[v0]; \
    [1:v:0]tpad=stop_mode=clone:stop_duration=10[v1]; \
    [2:v:0]tpad=stop_mode=clone:stop_duration=20[v2]; \
    [3:v:0]tpad=stop_mode=clone:stop_duration=20[v3]; \
    [v0][v1][v2][v3]concat=n=4:v=1:a=0[v]; \
    [4:a:0][5:a:0]concat=n=2:v=0:a=1[a]" \
  -map "[v]" \
  -map "[a]" \
  -c:v libx264 \
  -c:a aac \
  -pix_fmt yuv420p \
  -shortest \
  final.mp4
```

## Credits

Thanks to Runway for hosting the Hackathon and providing generous credits.

