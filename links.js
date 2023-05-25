window.addEventListener('DOMContentLoaded', (event) => {
    const linksElement = document.querySelector('.links');
    linksElement.classList.add('show');

    const button = document.querySelector('button');
    button.addEventListener('click', function() {
        const header = document.querySelector('h1');
        const paragraph = document.querySelector('p');
        header.style.color = 'red';
        header.style.fontFamily = 'Arial, sans-serif';
        paragraph.style.color = 'blue';
        paragraph.style.fontFamily = 'Verdana, sans-serif';
    });

    function createDropdownItem(text, link) {
        const newItem = document.createElement('a');
        newItem.href = link;
        newItem.textContent = text;
        return newItem;
    }

    function addDropdownItem(text, link) {
        const dropdownContent = document.querySelector('.dropdown-content');
        const newItem = createDropdownItem(text, link);
        dropdownContent.appendChild(newItem);
    }

    function removeDropdownItem(text) {
        const dropdownContent = document.querySelector('.dropdown-content');
        const items = dropdownContent.getElementsByTagName('a');

        for (let i = 0; i < items.length; i++) {
            if (items[i].textContent === text) {
                dropdownContent.removeChild(items[i]);
                break;
            }
        }
    }

    setTimeout(function() {
        addDropdownItem('Sheldon Cooper', 'https://bigbangtheory.fandom.com/wiki/Sheldon_Cooper');
    }, 5000);

    setTimeout(function() {
        removeDropdownItem('Sheldon Cooper');
    }, 8000);

    const barButton = document.querySelector('.user-bar #changeDetails');
    const removeButton = document.querySelector('#removeDetails');
    const refreshButton = document.getElementById('refresh');
    barButton.addEventListener('click', changeDetails);
    removeButton.addEventListener('click', removeDetails);
    refreshButton.addEventListener('click', () => {
        window.location.reload();
    });
    renderBar();

    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const namePattern = /^[A-Za-z\s]+$/;
        const reviewPattern = /^.{10,}$/;
        const gradePattern = /^(?:10|[1-9])$/;

        const name = document.getElementById('name').value;
        const review = document.getElementById('review').value;
        const grade = document.getElementById('grade').value;

        if (!namePattern.test(name)) {
            alert('Please enter a valid name.');
            return;
        }

        if (!reviewPattern.test(review)) {
            alert('Please enter a review with at least 10 characters.');
            return;
        }

        if (!gradePattern.test(grade)) {
            alert('Please enter a valid grade between 1 and 10.');
            return;
        }

        alert('Form submitted successfully!');
        form.reset();

        handleFormSubmission();
    });

function handleFormSubmission() {
  const feedbackContainer = document.querySelector('.feedback');
  const name = document.getElementById('name').value;
  const review = document.getElementById('review').value;
  const grade = document.getElementById('grade').value;

  const feedbackItem = document.createElement('div');
  feedbackItem.classList.add('feedback-item');

  const nameElement = document.createElement('p');
  nameElement.textContent = `Name: ${name}`;
  feedbackItem.appendChild(nameElement);

  const reviewElement = document.createElement('p');
  reviewElement.textContent = `Review: ${review}`;
  feedbackItem.appendChild(reviewElement);

  const gradeElement = document.createElement('p');
  gradeElement.textContent = `Grade: ${grade}`;
  feedbackItem.appendChild(gradeElement);

  feedbackContainer.appendChild(feedbackItem);
}

function renderBar() {
    const barMessage = document.querySelector('.user-bar .message');
    const barButton = document.querySelector('.user-bar #changeDetails');
    let userDetails = null;
    try {
        userDetails = JSON.parse(localStorage.getItem('userDetails'));
    } catch (error) {
        userDetails = null;
    }
    if (userDetails) {
        barMessage.innerHTML = `Welcome, ${userDetails.name}! You are ${userDetails.age} years old.`;
        barButton.innerHTML = "Change the details.";
    } else {
        barMessage.innerHTML = "Welcome! We don't know anything about you ...";
        barButton.innerHTML = "Add details";
    }
}

function changeDetails() {
    const name = prompt('Introduce yourself!');
    if (!name) return;
    const age = prompt('How old are you?');
    if (!age) return;
    const userDetails = { name, age };
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
    renderBar();
}

function removeDetails() {
    localStorage.removeItem('userDetails');
    renderBar();
}
});
