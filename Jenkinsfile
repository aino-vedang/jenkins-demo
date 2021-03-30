pipeline {
  agent any

    stages {
      stage('Ui resources conf') {
        steps {
            nodejs('node-js-14') {
              sh '''
                cd ui-module/labelox
                npm install
                ng-build --prod
                cp -r dist/* ../../src/main/resources/'''
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
