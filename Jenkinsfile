pipeline {
    agent {
        label 'docker-debian'
    }

    environment {
        PATH = '/home/jenkins/.nvm/versions/v14.15.1/bin:/home/jenkins/.nvm/versions/v14.15.1/bin:/opt/java/openjdk/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin'
    }

    stages {
        stage('init') {
            steps {
               sh 'aws --version'
               sh 'node --version'
            }
        }
    }
}
