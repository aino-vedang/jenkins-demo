pipeline {
  agent any

    stages {
      stage('Ui resources conf') {
        steps {
            nodejs('node-js') {
              withEnv(['npm_config_cache=npm-cache','HOME=.',]) {
                  sh '''
                      cd ui-module/labelox
                      rm -rf package-lock.json
                      rm -rf node_modules
                      npm set //npm.pkg.github.com/:_authToken ${GIT_ACCESS_TOKEN}
                      npm install -g @angular/cli
                      npm install
                      ng build --prod
                      ls ../../src/main/resources/
                      cp -r dist/* ../../src/main/resources/
                      ls ../../src/main/resources/'''
              }
            }
        }
      }
      stage('Apache conf') {
        steps {
        sh '''#!/bin/bash
                  freePort(){
                      while true
                      do
                              random_port=$(( ((RANDOM<<15)|RANDOM) % 49152 + 10000 ))
                              status="$(nc -z 127.0.0.1 $random_port < /dev/null &>/dev/null; echo $?)"
                              if [ "${status}" != "0" ]; then
                                      echo "$random_port";
                                      break;
                              fi
                      done
                  }
                  freePortJetty=$(freePort)
                  ipAddr="$(ip -o route get to 8.8.8.8 | sed -n 's/.*src \\([0-9.]\\+\\).*/\\1/p')"

                  echo "Staged url (RAW) -> http://$ipAddr:$freePortJetty/"

                  sed -i "s,.*ProxyPass /tool1/.*,ProxyPass /tool1/ http://localhost:$freePortJetty/," src/main/resources/apache.conf
                  sed -i "s,.*ProxyPassReverse /tool1/.*,ProxyPassReverse /tool1/ http://localhost:$freePortJetty/," src/main/resources/apache.conf

                  cat src/main/resources/apache.conf'''
        }
      }
    }
    post {
      always {
        cleanWs(cleanWhenAborted: true, cleanWhenFailure: true, cleanWhenSuccess: true, cleanWhenUnstable: true, deleteDirs: true)
      }
    }
}
