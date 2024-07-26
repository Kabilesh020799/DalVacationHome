provider "google" {
  project = "serverless-426514"
  region  = "us-central1"
}

resource "google_artifact_registry_repository" "dal-vacation-app" {
  name     = "dal-vacation-app"
  format   = "DOCKER"
  location = "us-central1"
}

resource "google_cloud_run_service" "frontend-service" {
  name     = "frontend-service"
  location = "us-central1"

  template {
    spec {
      containers {
        image = "us-central1-docker.pkg.dev/serverless-426514/dal-vacation-app/app"
      }
    }
  }

  # Allow unauthenticated access
  traffic {
    percent = 100
    latest_revision = true
  }
}

resource "google_cloud_run_service_iam_member" "all_users" {
  service = google_cloud_run_service.my_service.name
  location = google_cloud_run_service.my_service.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}

output "url" {
  value = google_cloud_run_service.my_service.status[0].url
}
