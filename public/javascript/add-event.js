async function newFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="event-title"]').value;
    const event_description = document.querySelector('textarea[name="event-description"]').value;
    const category = document.querySelector('input[name="event-category"]').value;
    const date = document.querySelector('input[name="event-date"]').value;
    const street = document.querySelector('input[name="event-location-street"]').value;

    const response = await fetch('/api/categories')

    const response = await fetch(`/api/events`, {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        event_description: event_description,
        category: category,
        date: date,
        address: [street, zip, city, state]
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);