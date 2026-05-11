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