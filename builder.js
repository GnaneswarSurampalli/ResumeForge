/* ============================================
   ResumeForge - Builder Page JavaScript
   Handles: dynamic form entries, real-time
   resume preview, template switching, and
   PDF download functionality
   ============================================ */


// ========== COUNTERS FOR UNIQUE IDS ==========
// We use these to give each experience/education entry a unique ID

var experienceCount = 0;
var educationCount = 0;


// ========== GET DOM ELEMENTS ==========

var preview = document.getElementById('resume-preview');
var templateSelect = document.getElementById('template-select');
var panelToggle = document.getElementById('panel-toggle');
var formPanel = document.getElementById('form-panel');


// ========== INITIALIZE PAGE ==========
// When the page loads, add one empty experience and education block

document.addEventListener('DOMContentLoaded', function () {
  addExperience();
  addEducation();
  renderPreview();
  attachInputListeners();
});


// ========== TEMPLATE CHANGE ==========
// Re-render the preview when user picks a different template

templateSelect.addEventListener('change', function () {
  renderPreview();
});


// ========== PANEL TOGGLE (Mobile) ==========
// On mobile, lets users collapse/expand the form panel

panelToggle.addEventListener('click', function () {
  formPanel.classList.toggle('collapsed');

  if (formPanel.classList.contains('collapsed')) {
    panelToggle.textContent = '☰ Show Form';
  } else {
    panelToggle.textContent = '☰';
  }
});


// ========== ADD EXPERIENCE ENTRY ==========
// Creates a new experience form block with company, position, dates, description

function addExperience() {
  experienceCount++;
  var id = experienceCount;

  var html = ''
    + '<div class="entry-block" id="exp-' + id + '">'
    + '  <button class="remove-btn" onclick="removeEntry(\'exp-' + id + '\')" title="Remove">&times;</button>'
    + '  <div class="form-row">'
    + '    <div class="form-group">'
    + '      <label>Company</label>'
    + '      <input type="text" class="exp-company" placeholder="Google" />'
    + '    </div>'
    + '    <div class="form-group">'
    + '      <label>Position</label>'
    + '      <input type="text" class="exp-position" placeholder="Software Engineer" />'
    + '    </div>'
    + '  </div>'
    + '  <div class="form-row">'
    + '    <div class="form-group">'
    + '      <label>Start Date</label>'
    + '      <input type="text" class="exp-start" placeholder="Jan 2022" />'
    + '    </div>'
    + '    <div class="form-group">'
    + '      <label>End Date</label>'
    + '      <input type="text" class="exp-end" placeholder="Present" />'
    + '    </div>'
    + '  </div>'
    + '  <div class="form-group">'
    + '    <label>Description</label>'
    + '    <textarea class="exp-desc" rows="2" placeholder="Key responsibilities and achievements..."></textarea>'
    + '  </div>'
    + '</div>';

  document.getElementById('experience-list').insertAdjacentHTML('beforeend', html);
  attachInputListeners();
}


// ========== ADD EDUCATION ENTRY ==========
// Creates a new education form block with school, degree, dates

function addEducation() {
  educationCount++;
  var id = educationCount;

  var html = ''
    + '<div class="entry-block" id="edu-' + id + '">'
    + '  <button class="remove-btn" onclick="removeEntry(\'edu-' + id + '\')" title="Remove">&times;</button>'
    + '  <div class="form-row">'
    + '    <div class="form-group">'
    + '      <label>Institution</label>'
    + '      <input type="text" class="edu-school" placeholder="MIT" />'
    + '    </div>'
    + '    <div class="form-group">'
    + '      <label>Degree</label>'
    + '      <input type="text" class="edu-degree" placeholder="B.S. Computer Science" />'
    + '    </div>'
    + '  </div>'
    + '  <div class="form-row">'
    + '    <div class="form-group">'
    + '      <label>Start Year</label>'
    + '      <input type="text" class="edu-start" placeholder="2018" />'
    + '    </div>'
    + '    <div class="form-group">'
    + '      <label>End Year</label>'
    + '      <input type="text" class="edu-end" placeholder="2022" />'
    + '    </div>'
    + '  </div>'
    + '</div>';

  document.getElementById('education-list').insertAdjacentHTML('beforeend', html);
  attachInputListeners();
}


// ========== REMOVE ENTRY ==========
// Removes an experience or education block with a fade-out animation

function removeEntry(entryId) {
  var element = document.getElementById(entryId);

  if (element) {
    // Fade out animation
    element.style.opacity = '0';
    element.style.transform = 'translateY(-10px)';

    // Remove from DOM after animation completes
    setTimeout(function () {
      element.remove();
      renderPreview();  // update the preview
    }, 250);
  }
}


// ========== ATTACH INPUT LISTENERS ==========
// Listen for any typing in the form and update the preview

function attachInputListeners() {
  var allInputs = document.querySelectorAll('.form-panel input, .form-panel textarea');

  allInputs.forEach(function (input) {
    // Remove old listener to prevent duplicates
    input.removeEventListener('input', renderPreview);
    // Add fresh listener
    input.addEventListener('input', renderPreview);
  });
}


// ========== COLLECT FORM DATA ==========
// Gathers all the form data into a single object

function collectFormData() {
  var data = {
    name: document.getElementById('fullName').value,
    title: document.getElementById('jobTitle').value,
    email: document.getElementById('userEmail').value,
    phone: document.getElementById('userPhone').value,
    location: document.getElementById('userLocation').value,
    website: document.getElementById('userWebsite').value,
    summary: document.getElementById('userSummary').value,
    experience: [],
    education: [],
    skills: []
  };

  // Collect all experience entries
  var expBlocks = document.querySelectorAll('#experience-list .entry-block');
  expBlocks.forEach(function (block) {
    data.experience.push({
      company: block.querySelector('.exp-company').value,
      position: block.querySelector('.exp-position').value,
      start: block.querySelector('.exp-start').value,
      end: block.querySelector('.exp-end').value,
      desc: block.querySelector('.exp-desc').value
    });
  });

  // Collect all education entries
  var eduBlocks = document.querySelectorAll('#education-list .entry-block');
  eduBlocks.forEach(function (block) {
    data.education.push({
      school: block.querySelector('.edu-school').value,
      degree: block.querySelector('.edu-degree').value,
      start: block.querySelector('.edu-start').value,
      end: block.querySelector('.edu-end').value
    });
  });

  // Parse skills from comma-separated string
  var skillsInput = document.getElementById('userSkills').value;
  if (skillsInput.trim() !== '') {
    var skillsArray = skillsInput.split(',');
    for (var i = 0; i < skillsArray.length; i++) {
      var skill = skillsArray[i].trim();
      if (skill !== '') {
        data.skills.push(skill);
      }
    }
  }

  return data;
}


// ========== RENDER RESUME PREVIEW ==========
// This is the main function that builds the resume HTML from form data

function renderPreview() {
  var data = collectFormData();
  var template = templateSelect.value;

  // Check if all fields are empty
  var hasExperience = false;
  for (var i = 0; i < data.experience.length; i++) {
    if (data.experience[i].company || data.experience[i].position) {
      hasExperience = true;
      break;
    }
  }

  var hasEducation = false;
  for (var j = 0; j < data.education.length; j++) {
    if (data.education[j].school || data.education[j].degree) {
      hasEducation = true;
      break;
    }
  }

  var isEmpty = !data.name && !data.title && !data.email
                && !hasExperience && !hasEducation && data.skills.length === 0;

  // Show empty state if no data entered
  if (isEmpty) {
    preview.className = '';
    preview.innerHTML = ''
      + '<div class="resume-empty-state">'
      + '  <div class="empty-icon">&#128196;</div>'
      + '  <p><strong>Your resume preview will appear here</strong></p>'
      + '  <p style="margin-top:8px;font-size:9.5pt;color:#bbb;">Start filling in your details on the left</p>'
      + '</div>';
    return;
  }

  // Set the template class on the preview wrapper
  preview.className = 'resume-' + template;

  // Build contact info line
  var contactItems = [];
  if (data.email) contactItems.push('&#9993; ' + escapeHtml(data.email));
  if (data.phone) contactItems.push('&#9742; ' + escapeHtml(data.phone));
  if (data.location) contactItems.push('&#128205; ' + escapeHtml(data.location));
  if (data.website) contactItems.push('&#127760; ' + escapeHtml(data.website));

  var contactHtml = '';
  for (var c = 0; c < contactItems.length; c++) {
    contactHtml += '<span>' + contactItems[c] + '</span>';
  }

  // Start building the resume HTML
  var html = '';

  // Header section
  html += '<div class="resume-header">';
  html += '  <div class="resume-name">' + (escapeHtml(data.name) || 'Your Name') + '</div>';
  if (data.title) {
    html += '  <div class="resume-jobtitle">' + escapeHtml(data.title) + '</div>';
  }
  html += '  <div class="resume-contact">' + contactHtml + '</div>';
  html += '</div>';

  // Body section
  html += '<div class="resume-body">';

  // Professional Summary
  if (data.summary) {
    html += '<div class="resume-section">';
    html += '  <div class="resume-section-title">Professional Summary</div>';
    html += '  <p class="resume-summary">' + escapeHtml(data.summary) + '</p>';
    html += '</div>';
  }

  // Experience section
  if (hasExperience) {
    html += '<div class="resume-section">';
    html += '  <div class="resume-section-title">Experience</div>';

    for (var e = 0; e < data.experience.length; e++) {
      var exp = data.experience[e];
      if (!exp.company && !exp.position) continue;  // skip empty entries

      var expDate = '';
      if (exp.start || exp.end) {
        expDate = escapeHtml(exp.start);
        if (exp.start && exp.end) expDate += ' — ';
        expDate += escapeHtml(exp.end);
      }

      html += '<div class="resume-entry">';
      html += '  <div class="resume-entry-header">';
      html += '    <span class="resume-entry-title">' + (escapeHtml(exp.position) || 'Position') + '</span>';
      html += '    <span class="resume-entry-date">' + expDate + '</span>';
      html += '  </div>';
      html += '  <div class="resume-entry-subtitle">' + escapeHtml(exp.company) + '</div>';
      if (exp.desc) {
        html += '  <div class="resume-entry-desc">' + escapeHtml(exp.desc) + '</div>';
      }
      html += '</div>';
    }

    html += '</div>';
  }

  // Education section
  if (hasEducation) {
    html += '<div class="resume-section">';
    html += '  <div class="resume-section-title">Education</div>';

    for (var d = 0; d < data.education.length; d++) {
      var edu = data.education[d];
      if (!edu.school && !edu.degree) continue;  // skip empty entries

      var eduDate = '';
      if (edu.start || edu.end) {
        eduDate = escapeHtml(edu.start);
        if (edu.start && edu.end) eduDate += ' — ';
        eduDate += escapeHtml(edu.end);
      }

      html += '<div class="resume-entry">';
      html += '  <div class="resume-entry-header">';
      html += '    <span class="resume-entry-title">' + (escapeHtml(edu.degree) || 'Degree') + '</span>';
      html += '    <span class="resume-entry-date">' + eduDate + '</span>';
      html += '  </div>';
      html += '  <div class="resume-entry-subtitle">' + escapeHtml(edu.school) + '</div>';
      html += '</div>';
    }

    html += '</div>';
  }

  // Skills section
  if (data.skills.length > 0) {
    html += '<div class="resume-section">';
    html += '  <div class="resume-section-title">Skills</div>';
    html += '  <div class="resume-skills-list">';
    for (var s = 0; s < data.skills.length; s++) {
      html += '    <span class="resume-skill-tag">' + escapeHtml(data.skills[s]) + '</span>';
    }
    html += '  </div>';
    html += '</div>';
  }

  html += '</div>';  // close resume-body

  // Update the preview
  preview.innerHTML = html;
}


// ========== ESCAPE HTML ==========
// Prevents XSS attacks by converting special characters to HTML entities

function escapeHtml(text) {
  if (!text) return '';

  var div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}


// ========== DOWNLOAD PDF ==========
// Uses the browser's built-in print dialog to save as PDF
// The @media print CSS hides everything except the resume

function downloadPDF() {
  window.print();
}
