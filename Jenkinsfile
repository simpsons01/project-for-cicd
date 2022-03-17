pipeline {
    agent {
        dockerfile true
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
