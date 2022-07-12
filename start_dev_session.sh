folder_name=$(basename "$PWD")
tmux ls | grep $folder_name
if [ $? -eq "0" ]; then
  tmux a -t $folder_name
  exit 0
fi

tmux new-session -d -s $folder_name

tmux split-window -t $folder_name:0 "bash --init-file <(echo ""tsc -w"")"
tmux split-window -h -t $folder_name:0 "bash --init-file <(echo ""webpack --config bin/webpack.watch.config.js"")"
tmux split-window -h -t $folder_name:0 "bash --init-file <(echo ""npm start"")"

tmux a -t $folder_name
