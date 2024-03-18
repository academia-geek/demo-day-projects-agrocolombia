node {
  stage('SCM') {
    checkout scm
  }
  stage('SonarQube Analysis') {
    def scannerHome = tool 'sonarqubeScanner';
    withSonarQubeEnv() {
      sh "${scannerHome}/bin/sonar-scanner"
    }
  }
  stage('Instalacion de dependencias') {
    if (usSonarCubeScanerSuccesful()){
      sh 'npm install'
    }else {
      error('No se aprobo el codigo')
    }
  }
}
