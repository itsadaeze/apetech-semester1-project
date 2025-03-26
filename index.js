//  NUMBER OF TIMES VISTED THE WEBSITE
let visitorCount = parseInt(localStorage.getItem('visitorCount')) || 0;

// Increment and display the count
visitorCount++;
document.getElementById('count').textContent = visitorCount;

// Saves the updated count to localStorage
localStorage.setItem('visitorCount', visitorCount);







        //   CONTACT SECTION

      const form = document.getElementById('contactForm');
        const modal = document.getElementById('myModal');
        const modalClose = document.getElementById('modalClose');

        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission
            modal.style.display = "block";

        //   clears the form here after successful submission
            form.reset();
        });

        modalClose.addEventListener('click', function() {
            modal.style.display = "none";
        });

        window.addEventListener('click', function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        });


        




        //   FAQ SECTION
          const faqList = document.getElementById('faqList');
        let activeIndex = null;

        // Fetch the data from faqData.json
        document.addEventListener('DOMContentLoaded', function() {
            const faqList = document.getElementById('faqList');
            let activeIndex = null;
    
            fetch('json/faqData.json')
                .then(response => response.json())
                .then(faqData => {
                    faqData.forEach((faq, index) => {
                        const faqItem = document.createElement('div');
                        faqItem.className = 'faq-item';
    
                        faqItem.innerHTML = `
                            <div class="faq-question" data-index="${index}">
                                <div class="faq-question-text">${faq.question}</div>
                                <div class="faq-question-arrow">
                                    <i class="fas fa-chevron-down arrow-down"></i>
                                </div>
                            </div>
                            <div class="faq-answer" id="answer-${index}">${faq.answer}</div>
                            <hr class="faq-divider">
                        `;
    
                        faqList.appendChild(faqItem);
                    });
    
                    faqList.addEventListener('click', (event) => {
                        const questionDiv = event.target.closest('.faq-question');
                        if (questionDiv) {
                            const index = parseInt(questionDiv.dataset.index);
                            const answerDiv = document.getElementById(`answer-${index}`);
                            const arrowIcon = questionDiv.querySelector('i');
    
                            if (activeIndex === index) {
                                answerDiv.style.display = 'none';
                                arrowIcon.className = 'fas fa-chevron-down arrow-down';
                                activeIndex = null;
                            } else {
                                if (activeIndex !== null) {
                                    const prevAnswerDiv = document.getElementById(`answer-${activeIndex}`);
                                    const prevArrowIcon = document.querySelector(`.faq-question[data-index="${activeIndex}"] i`);
                                    prevAnswerDiv.style.display = 'none';
                                    prevArrowIcon.className = 'fas fa-chevron-down arrow-down';
                                }
                                answerDiv.style.display = 'block';
                                arrowIcon.className = 'fas fa-chevron-up arrow-up';
                                activeIndex = index;
                            }
                        }
                    });
                })
                .catch(error => console.error('Error fetching FAQ data:', error));
        });



       