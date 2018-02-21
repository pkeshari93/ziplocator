// listen for submit
      document.querySelector('#zipForm').addEventListener('submit', generateLocationInfo);

      // listen for delete 
      document.querySelector('body').addEventListener('click', deleteLocation);

      // listen for reload on bad zip entry
      document.querySelector('body').addEventListener('click', reloadApp);


      function generateLocationInfo(e){
        e.preventDefault();
        const zip = document.querySelector('.zip').value;

        // making a rquest with fetch 
        // using money sign to put a variable inside a template string
        fetch(`http://api.zippopotam.us/us/${zip}`)
          .then(response => {
            if(response.status != 200){

              // call showIcon to show remove
              showIcon('remove');
              document.querySelector('#output').innerHTML = 
                `
                  <div class="alert alert-danger" role="alert">
                    <strong>Oh snap!</strong> You entered an invalid zipcode, try again!.
                    <button type="button" class="reload">Reload to try again</button>
                  </div>
                `;
                throw Error(response.statusText);
            } else{
                  // call showIcon to show check
                  showIcon('check');
                  return response.json();
                }
          })
          .then(data => {
            // show location
            let output = '';
            data.places.forEach(places => {
              output += `
                <div class="alert alert-primary" role="alert">
                  <p>Location found</p>
                  <button type="button" class="delete">Delete</button>
                </div>
                <div class="alert alert-light" role="alert">
                  <ul>
                    <li><strong>City: </strong>${places['place name']}</li>
                    <li><strong>State: </strong>${places['state']}</li>
                    <li><strong>Longitude: </strong>${places['longitude']}</li>
                    <li><strong>Latitude: </strong>${places['latitude']}</li>
                  </ul>
                </div>
              `
            });

            // insert information into output div
            document.querySelector('#output').innerHTML = output;
            console.log(data);
          })
          .catch(err => console.log(err));

      } 

      function showIcon(icon){
        // hide icons
        document.querySelector('.icon-check').style.display = 'none';
        document.querySelector('.icon-remove').style.display = 'none';

        // show appropriate icon
        document.querySelector(`.icon-${icon}`).style.display = 'inline-block';
        document.querySelector(`.icon-${icon}`).style.display = 'inline-block';       


      }   


      function deleteLocation(e){
        // check to see if delete button was clicked
        if(e.target.className == 'delete'){
          document.querySelector('#output').remove();
          document.querySelector('.zip').value = '';
          document.querySelector('.icon-check').remove();
          location.reload();

        }
      }

      function reloadApp(e){
        if(e.target.className == 'reload'){
          location.reload();
        }
      }