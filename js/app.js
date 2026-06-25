/* ==========================================================
   SHARECAR V2
========================================================== */

window.addEventListener("DOMContentLoaded",()=>{

    /* Mobile Navigation */

    const header=document.querySelector("#header");

    const menuButton=document.querySelector(".mobile-menu");

    const nav=document.querySelector("#primary-navigation");

    const closeMenu=()=>{

        if(!header || !menuButton) return;

        header.classList.remove("menu-open");

        menuButton.setAttribute("aria-expanded","false");

        menuButton.setAttribute("aria-label","모바일 메뉴 열기");

        menuButton.textContent="☰";

    };

    const openMenu=()=>{

        if(!header || !menuButton) return;

        header.classList.add("menu-open");

        menuButton.setAttribute("aria-expanded","true");

        menuButton.setAttribute("aria-label","모바일 메뉴 닫기");

        menuButton.textContent="×";

    };

    if(header && menuButton && nav){

        menuButton.addEventListener("click",()=>{

            const isOpen=menuButton.getAttribute("aria-expanded")==="true";

            if(isOpen){

                closeMenu();

            }else{

                openMenu();

            }

        });

        nav.addEventListener("click",(event)=>{

            if(event.target.closest("a")){

                closeMenu();

            }

        });

        document.addEventListener("click",(event)=>{

            if(!header.classList.contains("menu-open")) return;

            if(header.contains(event.target)) return;

            closeMenu();

        });

        document.addEventListener("keydown",(event)=>{

            if(event.key==="Escape"){

                closeMenu();

            }

        });

    }

    /* FAQ */

    document.querySelectorAll(".faq-question").forEach(item=>{

        item.addEventListener("click",()=>{

            item.parentElement.classList.toggle("open");

        });

    });

    /* Contact Button */

    const kakao=document.querySelector("#open-kakao-link");

    if(kakao){

        kakao.href="https://open.kakao.com/";

    }

    /* Contact Form */

    const contactForm=document.querySelector("#contact-form");

    const formMessage=document.querySelector("#contact-form-message");

    if(contactForm && formMessage){

        contactForm.addEventListener("submit",(event)=>{

            event.preventDefault();

            if(!contactForm.checkValidity()){

                contactForm.classList.add("submitted");

                formMessage.textContent="필수 항목을 확인해주세요.";

                return;

            }

            contactForm.reset();

            contactForm.classList.remove("submitted");

            formMessage.textContent="문의가 접수되었습니다. 빠르게 상담 안내를 드리겠습니다.";

        });

    }

});
