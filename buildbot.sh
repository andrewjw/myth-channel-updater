#!/bin/bash

set -e

pip3 install -r requirements.txt

./code_style.sh
./run_tests.sh

BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo "Building branch $BRANCH"
if [[ "$BRANCH" == "master" ]]; then
  COVERALLS_REPO_TOKEN=$MYTHCHANNEL_COVERALLS_REPO_TOKEN coveralls
  semantic-release publish
fi
if [[ ${BRANCH:0:7} == "heads/v" ]]; then
    TAG=${BRANCH:7} ./docker_push.sh
fi
