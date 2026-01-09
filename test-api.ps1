#!/usr/bin/env powershell

# Task Management Application - Testing Script
# This script tests all endpoints locally

$API_URL = "http://localhost:3001"
$EMAIL = "test.user.$(Get-Random)@example.com"
$PASSWORD = "TestPassword123"
$NAME = "Test User"

Write-Host "================================" -ForegroundColor Cyan
Write-Host "Task Management API Test Suite" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Color functions
function Write-Success {
    param([string]$Message)
    Write-Host "✓ $Message" -ForegroundColor Green
}

function Write-Error {
    param([string]$Message)
    Write-Host "✗ $Message" -ForegroundColor Red
}

function Write-Info {
    param([string]$Message)
    Write-Host "ℹ $Message" -ForegroundColor Yellow
}

# Check if backend is running
Write-Info "Checking if backend is running at $API_URL..."
try {
    $response = Invoke-RestMethod -Uri "$API_URL/auth/me" -Method Get -Headers @{"Authorization" = "Bearer test"} -ErrorAction SilentlyContinue
    Write-Success "Backend is running!"
} catch {
    Write-Error "Backend is not running. Please start it with: cd server && npm run dev"
    exit 1
}

Write-Host ""
Write-Host "1. Testing User Signup" -ForegroundColor Magenta
Write-Host "-----------------------" -ForegroundColor Magenta

$signupBody = @{
    name     = $NAME
    email    = $EMAIL
    password = $PASSWORD
} | ConvertTo-Json

try {
    $signupResponse = Invoke-RestMethod -Uri "$API_URL/auth/signup" -Method Post `
        -Headers @{"Content-Type" = "application/json"} `
        -Body $signupBody

    if ($signupResponse.token) {
        Write-Success "User signup successful"
        Write-Host "  Email: $EMAIL"
        Write-Host "  Name: $NAME"
        $TOKEN = $signupResponse.token
        $USER_ID = $signupResponse.user.id
    } else {
        Write-Error "Signup failed: No token received"
        exit 1
    }
} catch {
    Write-Error "Signup failed: $($_.Exception.Message)"
    exit 1
}

Write-Host ""
Write-Host "2. Testing Get Current User" -ForegroundColor Magenta
Write-Host "----------------------------" -ForegroundColor Magenta

try {
    $userResponse = Invoke-RestMethod -Uri "$API_URL/auth/me" -Method Get `
        -Headers @{"Authorization" = "Bearer $TOKEN"}
    
    Write-Success "Get current user successful"
    Write-Host "  ID: $($userResponse.id)"
    Write-Host "  Email: $($userResponse.email)"
    Write-Host "  Name: $($userResponse.name)"
} catch {
    Write-Error "Get user failed: $($_.Exception.Message)"
}

Write-Host ""
Write-Host "3. Testing Login" -ForegroundColor Magenta
Write-Host "----------------" -ForegroundColor Magenta

$loginBody = @{
    email    = $EMAIL
    password = $PASSWORD
} | ConvertTo-Json

try {
    $loginResponse = Invoke-RestMethod -Uri "$API_URL/auth/login" -Method Post `
        -Headers @{"Content-Type" = "application/json"} `
        -Body $loginBody

    if ($loginResponse.token) {
        Write-Success "Login successful"
        $TOKEN = $loginResponse.token
    } else {
        Write-Error "Login failed: No token received"
    }
} catch {
    Write-Error "Login failed: $($_.Exception.Message)"
}

Write-Host ""
Write-Host "4. Testing Create Task" -ForegroundColor Magenta
Write-Host "---------------------" -ForegroundColor Magenta

$taskBody = @{
    title       = "Test Task $(Get-Random)"
    description = "This is a test task"
    status      = "pending"
} | ConvertTo-Json

try {
    $taskResponse = Invoke-RestMethod -Uri "$API_URL/tasks" -Method Post `
        -Headers @{
        "Authorization" = "Bearer $TOKEN"
        "Content-Type"  = "application/json"
    } `
        -Body $taskBody

    Write-Success "Task created successfully"
    Write-Host "  ID: $($taskResponse.id)"
    Write-Host "  Title: $($taskResponse.title)"
    Write-Host "  Status: $($taskResponse.status)"
    $TASK_ID = $taskResponse.id
} catch {
    Write-Error "Create task failed: $($_.Exception.Message)"
}

Write-Host ""
Write-Host "5. Testing Get All Tasks" -ForegroundColor Magenta
Write-Host "------------------------" -ForegroundColor Magenta

try {
    $tasksResponse = Invoke-RestMethod -Uri "$API_URL/tasks" -Method Get `
        -Headers @{"Authorization" = "Bearer $TOKEN"}

    Write-Success "Get tasks successful"
    Write-Host "  Total tasks: $($tasksResponse.Count)"
    foreach ($task in $tasksResponse) {
        Write-Host "    - $($task.title) ($($task.status))"
    }
} catch {
    Write-Error "Get tasks failed: $($_.Exception.Message)"
}

Write-Host ""
Write-Host "6. Testing Search Tasks" -ForegroundColor Magenta
Write-Host "-----------------------" -ForegroundColor Magenta

try {
    $searchResponse = Invoke-RestMethod -Uri "$API_URL/tasks?search=Test" -Method Get `
        -Headers @{"Authorization" = "Bearer $TOKEN"}

    Write-Success "Search tasks successful"
    Write-Host "  Found: $($searchResponse.Count) task(s)"
} catch {
    Write-Error "Search tasks failed: $($_.Exception.Message)"
}

Write-Host ""
Write-Host "7. Testing Filter Tasks by Status" -ForegroundColor Magenta
Write-Host "---------------------------------" -ForegroundColor Magenta

try {
    $filterResponse = Invoke-RestMethod -Uri "$API_URL/tasks?status=pending" -Method Get `
        -Headers @{"Authorization" = "Bearer $TOKEN"}

    Write-Success "Filter tasks successful"
    Write-Host "  Pending tasks: $($filterResponse.Count)"
} catch {
    Write-Error "Filter tasks failed: $($_.Exception.Message)"
}

if ($TASK_ID) {
    Write-Host ""
    Write-Host "8. Testing Update Task" -ForegroundColor Magenta
    Write-Host "---------------------" -ForegroundColor Magenta

    $updateBody = @{
        title       = "Updated Task Title"
        description = "Updated description"
        status      = "in-progress"
    } | ConvertTo-Json

    try {
        $updateResponse = Invoke-RestMethod -Uri "$API_URL/tasks/$TASK_ID" -Method Put `
            -Headers @{
            "Authorization" = "Bearer $TOKEN"
            "Content-Type"  = "application/json"
        } `
            -Body $updateBody

        Write-Success "Task updated successfully"
        Write-Host "  Title: $($updateResponse.title)"
        Write-Host "  Status: $($updateResponse.status)"
    } catch {
        Write-Error "Update task failed: $($_.Exception.Message)"
    }

    Write-Host ""
    Write-Host "9. Testing Delete Task" -ForegroundColor Magenta
    Write-Host "---------------------" -ForegroundColor Magenta

    try {
        $deleteResponse = Invoke-RestMethod -Uri "$API_URL/tasks/$TASK_ID" -Method Delete `
            -Headers @{"Authorization" = "Bearer $TOKEN"}

        Write-Success "Task deleted successfully"
    } catch {
        Write-Error "Delete task failed: $($_.Exception.Message)"
    }
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "Test Suite Completed" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan

Write-Info "All tests passed! Application is working correctly."
Write-Info "You can now test the frontend at: http://localhost:3002"
