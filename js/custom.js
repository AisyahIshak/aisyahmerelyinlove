
$(document).ready(function () {

  async function fetchAndCreateProjectCards() {
      try {
        // Fetch JSON data
        const response = await fetch('./js/projects.json');

        if (!response.ok) {
          throw new Error(`Failed to load JSON file (HTTP ${response.status})`);
        }

        // Parse JSON data
        const jsonData = await response.json();

        // Extract projects array
        const projects = jsonData.projects.sort((x,y) => {
          let c = x.id.match(utm_term)
          let d = y.id.match(utm_term)
          return c?.length ? -1 : d?.length ? 1 : 0
        });

        // Function to create a card for each project
        function createProjectCard(project) {
          const card = document.createElement('div');
          card.classList.add('project-card', 'bg-white', 'relative', 'shadow-md', 'flex', 'flex-col', 'justify-around', `${project.type}`);

          // Add project information to the card
          card.innerHTML = `
          <div class="front flex flex-col h-full justify-between">
              ${project.bumi
                  ? `
                  <div class="flex items-center gap-2 absolute top-0 left-0 bg-[#FA5C1F] py-2 px-3 rounded-xl rounded-bl-none rounded-t-none">
                    <img class="w-[25px]" src="./assets/img/icon-discount.svg" alt="">  
                    <p class="text-[14px] font-MontserratLight text-white">*After <span class="font-MontserratBold">${project.bumi}%</span> Bumi Discount</p>
                  </div>
                  ` : ``}
              <div class="project-img">
                  <img src="${project.image}" alt="${project.name}" class="w-full h-[230px] xl:h-[300px] object-cover object-top">
              </div>
              <div class="project-info bg-white py-[15px]">
                  <h4 class="p-title text-center text-[#97793f] font-GothamBold text-[18px] 2xl:text-[18px]">${project.name}</h4>
                  <div class="flex items-center justify-center">
                      <img class="h-[20px] object-contain mr-2" src="./assets/img/location.png" alt="">
                      <p class="p-location text-black font-GothamMedium text-[14px] 2xl:text-[14px]">${project.location}</p>
                  </div>
              </div>
              <hr>
              ${project.bedroom
                ? `
                  <div class="bg-white py-[10px] grid grid-cols-2">
                    <div class="flex items-center justify-center">
                      <img class="h-[20px] object-contain mr-2 w-[15px]" src="./assets/img/icon-bed.png" alt="">
                      <p class="p-description text-[#555555] font-GothamBook text-[13px] 2xl:text-[14px]">${project.bedroom}</p>
                    </div>
                    <div class="flex items-center justify-center">
                      <img class="h-[20px] object-contain mr-2 w-[15px]" src="./assets/img/icon-size.png" alt="">
                      <p class="p-description text-[#555555] font-GothamBook text-[13px] 2xl:text-[14px]">${project.size}</p>
                    </div>
                  </div>
                `
                : `
                  <div class="bg-white py-[10px] flex items-center justify-center">
                    <img class="h-[20px] object-contain mr-2 w-[15px]" src="./assets/img/icon-size.png" alt="">
                    <p class="p-description text-[#555555] font-GothamBook text-[13px] 2xl:text-[14px]">${project.size}</p>
                  </div>
                `
              }                
              <hr>
              ${project.price_monthly
                  ? `
                    <div class="price flex justify-center items-center bg-white">
                      <div class="w-1/2 border-r py-[10px] text-left pl-5">
                          <p class="text-[#555555] font-GothamBook text-[13px] 2xl:text-[14px]">Monthly Payment</p>
                          <p class="monthly-pay text-black font-GothamBold text-[18px] 2xl:text-[18px]">${project.price_monthly}</p>
                      </div>
                      <div class="w-1/2 py-[10px] text-left pl-5">
                          <p class="text-[#555555] font-GothamBook text-[13px] 2xl:text-[14px]">Price From</p>
                          <p class="price-from text-black font-GothamBold text-[18px] 2xl:text-[18px]">${project.price_from}</p>
                      </div>
                    </div>
                  `
                  : `
                    <div class="price flex justify-center items-center bg-white">
                      <div class="w-full py-[10px] text-center">
                          <p class="text-[#555555] font-GothamBook text-[13px] 2xl:text-[14px]">Price From</p>
                          <p class="price-from text-black font-GothamBold text-[18px] 2xl:text-[18px]">${project.price_from}</p>
                      </div>
                    </div>
                  `
              }
              <hr>
              <div class="grid grid-cols-2 gap-4">
                <div class="sales-feature flex justify-center items-center">
                    <div class="w-full py-[10px] feature-container">
                        <a id="${project.button_id.features}" class="featuresbtn flex items-center justify-center text-black font-GothamBold border border-[#FA5C1F] rounded-md w-[90%] py-3 ml-auto text-[14px] 2xl:text-[18px] hover:bg-black hover:text-white" href="">
                            Features
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[20px] ml-2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>                            
                        </a>
                    </div>
                </div>
                <div class="button-register flex justify-center items-center ">
                    <a href="#registration" id="${project.button_id.register_now}" data-project="${project.button_id.dataProject}" class="anchor-card reg_btn flex justify-center w-[90%] py-3 mr-auto text-center text-white font-GothamBold bg-[#FA5C1F] border border-[#FA5C1F] rounded-md text-[17px] 2xl:text-[18px] hover:opacity-75">Register Now</a>
                </div>
              </div>
          </div>

          <div class="back absolute top-0 left-0" style="display:none;">
              <div class="header bg-white py-[10px]">
                  <h4 class="p-title text-black font-GothamBold text-center text-[17px] 2xl:text-[18px]">${project.name}</h4>
              </div>
              <hr>
              <div class="content featurescontent p-4"> 
                  <ul class="mt-4">
                  ${project.features.map(feature => `
                    <li class="flex items-start space-x-2 mb-[15px]" key="${feature.description}">
                      <img src="${feature.icon}" alt="${feature.description}" class="w-[20px] h-auto object-contain">
                      <span class="p-description text-[#555555] font-GothamMedium text-[13px] 2xl:text-[14px]">${feature.description}</span>
                    </li>
                  `).join('')}
                  </ul>
              </div>

              <div class="footer pb-5">
                  <a class="flip-btn w-[50%] mx-auto flex items-center justify-center text-black font-GothamBold border border-black rounded-md py-2 text-[17px] 2xl:text-[18px] hover:bg-black hover:text-white" href="">
                  Back   
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[20px] ml-2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>                                                        
                  </a>
                  <a href="#registration" id="${project.button_id.register_now}" data-project="${project.button_id.dataProject}" class="anchor-card reg_btn flip-btn w-[50%] mx-auto flex justify-center text-center text-white font-GothamBold bg-[#FA5C1F] border border-[#FA5C1F] rounded-md py-3 mt-4 text-[17px] 2xl:text-[18px] hover:opacity-75">Register Now</a>
              </div>
          </div>
          `;

            // Get the features button, back button, and back element
            const featuresBtn = card.querySelector(`#${project.button_id.features}`);
            const backButton = card.querySelector('.back .flip-btn');
            const backElement = card.querySelector('.back');

            // Add click event listener to the features button
            featuresBtn.addEventListener('click', function (event) {
                event.preventDefault();
                // Toggle the display property of the front and back sections
                card.querySelector('.front').style.display = 'none';
                backElement.style.display = 'block';
            });

            // Add click event listener to the back button in the back section
            backButton.addEventListener('click', function (event) {
                event.preventDefault();
                // Toggle the display property of the front and back sections
                card.querySelector('.front').style.display = 'block';
                backElement.style.display = 'none';
            });

          return card;
        }

        // Append project cards to the container
        const projectCardsContainer = document.getElementById('project-cards');
        projects.forEach(project => {
          const projectCard = createProjectCard(project);
          projectCardsContainer.appendChild(projectCard);
        });

      } catch (error) {
        console.error('Error fetching or parsing JSON data:', error);
      }
    }

    // Call the function to fetch and create project cards
    fetchAndCreateProjectCards();
  
});
$(document).ready(function () {  
$('.project-card.highrise, .project-card.commercial').hide();

$('#landedbtn').click(function() {
  $('.project-card.highrise, .project-card.commercial').hide();
  $('#highrisebtn, #commercialbtn').removeClass('active');
  $('#landedbtn').addClass('active');
  $('.project-card.landed').show();
});

$('#highrisebtn').click(function() {
  $('.project-card.landed, .project-card.commercial').hide();
  $('#landedbtn, #commercialbtn').removeClass('active');
  $('#highrisebtn').addClass('active');
  $('.project-card.highrise').show();
});

$('#commercialbtn').click(function() {
  $('.project-card.landed, .project-card.highrise').hide();
  $('#landedbtn, #highrisebtn').removeClass('active');
  $('#commercialbtn').addClass('active');
  $('.project-card.commercial').show();
});
});

  document.addEventListener("DOMContentLoaded", function () {
    const fields = [
      { id: "phone", label: "label[for='phone']", translate: true, adjustTop: true },
      { id: "name", label: "label[for='name']", translate: false, adjustTop: false },
      { id: "email", label: "label[for='email']", translate: false, adjustTop: false },
      { id: "city", label: "label[for='city']", translate: false, adjustTop: false }
    ];

    fields.forEach(({ id, label, translate, adjustTop }) => {
      const input = document.querySelector(`#${id}`);
      const labelElement = document.querySelector(label);

      if (!input || !labelElement) return;

      input.addEventListener("focus", function () {
        labelElement.classList.add("top-[-0px]", "text-xs", "text-black", "bg-white");
        if (adjustTop) labelElement.classList.add("top-[-8px]");
        if (translate) labelElement.classList.add("-translate-x-10");
      });

      input.addEventListener("blur", function () {
        if (!input.value) {
          labelElement.classList.remove("top-[-0px]", "text-xs", "text-black", "bg-white");
          if (adjustTop) labelElement.classList.remove("top-[-8px]");
          if (translate) labelElement.classList.remove("-translate-x-10");
        }
      });
    });
  });