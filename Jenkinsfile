def getCommitSha() {
  sh "git rev-parse HEAD > .git/current-commit"
  return readFile(".git/current-commit").trim()
}


pipeline {
    agent any
    
    environment {
        COMMIT_SHA = getCommitSha()
    }

    stages {
        stage('init') {
            steps {
                withCredentials([string(credentialsId: 'github_token', variable: 'GITHUB_TOKEN')]) {
                    sh ("""
                        curl \
                        -X POST \
                        -H \"Accept: application/vnd.github.v3+json\" \
                        -H \"Authorization: token ${GITHUB_TOKEN}\" \
                        https://api.github.com/repos/simpsons01/project-for-cicd/statuses/${COMMIT_SHA} \
                        -d \"{ \\"state\\":\\"failure\\",  \\"context\\": \\"jenkins\\" }\" 
                    """)
                }
            }
        }
        
        stage('install') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('test') {
            steps {
                sh 'npm run test:unit'
            }
        }
        
        stage('deploy') {
            parallel {
                stage('deploy main') {
                    steps {
                        sh "npm run build-lab:main"
                    }
                }
                stage('deploy about') {
                    steps {
                        sh "npm run build-lab:about"                     
                    }
                }
            }
        }
    }

    post {
        success {
            withCredentials([string(credentialsId: 'github_token', variable: 'GITHUB_TOKEN')]) {
              sh ("""
                curl \
                  -X POST \
                  -H \"Accept: application/vnd.github.v3+json\" \
                  -H \"Authorization: token ${GITHUB_TOKEN}\" \
                  https://api.github.com/repos/simpsons01/project-for-cicd/statuses/${COMMIT_SHA} \
                  -d \"{ \\"state\\":\\"success\\",  \\"context\\": \\"jenkins\\" }\" 
              """)
            }
        }
        failure {
            withCredentials([string(credentialsId: 'github_token', variable: 'GITHUB_TOKEN')]) {
              sh ("""
                curl \
                  -X POST \
                  -H \"Accept: application/vnd.github.v3+json\" \
                  -H \"Authorization: token ${GITHUB_TOKEN}\" \
                  https://api.github.com/repos/simpsons01/project-for-cicd/statuses/${COMMIT_SHA} \
                  -d \"{ \\"state\\":\\"failure\\",  \\"context\\": \\"jenkins\\" }\" 
              """)
            }
        }
    }
}
