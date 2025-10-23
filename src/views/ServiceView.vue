<template>
  <!-- Aplica el tema solo dentro (si usas el style.scoped.css con .te-scope) -->
  <div class="te-scope">

    <!-- Preloader -->
    <div id="preloader" v-if="showPreloader">
      <div class="preloader-image">
        <img src="../assets/images/icon/preloader.gif" alt="preeloader"/>
      </div>
      <div class="loader">
        <div class="row">
          <div class="col-3 loader-area"><div class="loader-bg"></div></div>
          <div class="col-3 loader-area"><div class="loader-bg"></div></div>
          <div class="col-3 loader-area"><div class="loader-bg"></div></div>
          <div class="col-3 loader-area"><div class="loader-bg"></div></div>
        </div>
      </div>
    </div>

    <!-- Header -->
    <header class="header-area style-3">
      <!-- Top bar -->
      <div class="header-top">
        <div class="container">
          <div class="row"><div class="col-12">
            <div class="te-header-top-wrapper">
              <div class="header-top-info">
                <div class="te-header-contact-info">
                  <span><a href="tel:+123-555-0129"><i class="fa-solid fa-phone"></i>(629) 555-0129</a></span>
                  <span><a href="mailto:info@example.com"><i class="fa-solid fa-envelope"></i>info@example.com</a> </span>
                  <span><span class="te-contact-info-item"><i class="fa-solid fa-location-dot"></i>6391 Elgin St. Celina, 10299</span></span>
                </div>
              </div>
              <div class="header-top-info">
                <div class="te-social-profile">
                  <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
                  <a href="#"><i class="fa-brands fa-twitter"></i></a>
                  <a href="#"><i class="fa-brands fa-linkedin-in"></i></a>
                  <a href="#"><i class="fa-brands fa-youtube"></i></a>
                </div>
              </div>
            </div>
          </div></div>
        </div>
      </div>

      <!-- Nav -->
      <div class="te-header-menu-area te-sticky-header">
        <div class="container">
          <div class="container">
            <div class="row menu-wrapper">
              <div class="col-xl-3 col-lg-3 col-md-6 col-6 d-flex align-items-center">
                <div class="te-logo">
                  <RouterLink to="/" class="te-standard-logo">
                    <img src="../assets/images/logo/logo.png" alt="logo"/>
                  </RouterLink>
                  <RouterLink to="/" class="te-sticky-logo">
                    <img src="../assets/images/logo/logo.png" alt="logo"/>
                  </RouterLink>
                  <RouterLink to="/" class="te-retina-logo">
                    <img src="../assets/images/logo/logo.png" alt="logo"/>
                  </RouterLink>
                </div>
              </div>
              <div class="col-xl-9 col-lg-9 col-md-6 col-6 d-flex align-items-center justify-content-end">
                <div class="te-menu d-inline-block">
                  <!-- Menú estático: puedes convertirlo a RouterLink según tus rutas -->
                  <nav id="main-menu" class="te-main-menu">
                    <ul>
                      <li class="te-dropdown active">
                        <RouterLink to="/">Home</RouterLink>
                        <ul>
                          <li><RouterLink to="/">Home Page 1</RouterLink></li>
                          <li><a href="#">Home Page 2</a></li>
                        </ul>
                      </li>
                      <li><a href="#">About Us</a></li>
                      <li class="te-dropdown">
                        <RouterLink to="/service">Services</RouterLink>
                        <ul class="te-submenu">
                          <li><RouterLink to="/service">Service Page</RouterLink></li>
                          <li><a href="#">Service Details Page</a></li>
                        </ul>
                      </li>
                      <li><a href="#">Gallery</a></li>
                      <li class="te-dropdown">
                        <a href="#">Blog</a>
                        <ul class="te-submenu">
                          <li><a href="#">Blog Page</a></li>
                          <li><a href="#">Blog Details Page</a></li>
                        </ul>
                      </li>
                      <li class="te-dropdown">
                        <a href="#">Page</a>
                        <ul class="te-submenu">
                          <li><a href="#">About Page</a></li>
                          <li><a href="#">Donation Page</a></li>
                          <li><a href="#">Event Page</a></li>
                          <li><a href="#">Team Page</a></li>
                          <li><a href="#">Team Details Page</a></li>
                        </ul>
                      </li>
                      <li><a href="#">Contact</a></li>
                    </ul>
                  </nav>
                </div>

                <!-- Call btn -->
                <div class="te-header-btn">
                  <div class="te-call-btn">
                    <div class="icon"><i class="fa-solid fa-phone"></i></div>
                    <div class="call-info">
                      <span>Need help?</span>
                      <a href="tel:+13075550133">(307) 555-0133</a>
                    </div>
                  </div>
                </div>

                <!-- Mobile toggle -->
                <div class="te-mobile-menu-bar d-xl-none text-end">
                  <button class="te-mobile-menu-toggle-btn btn" @click="toggleSidebar">
                    <i class="fal fa-bars"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Sidebar móvil -->
    <div class="te-menu-sidebar-area" :class="{ 'open': isSidebarOpen }">
      <div class="te-menu-sidebar-wrapper">
        <div class="te-menu-sidebar-close">
          <button class="te-menu-sidebar-close-btn" id="menu_sidebar_close_btn" @click="closeSidebar">
            <i class="fal fa-times"></i>
          </button>
        </div>
        <div class="te-menu-sidebar-content">
          <div class="te-menu-sidebar-logo">
            <RouterLink to="/"><img src="../assets/images/logo/logo.png" alt="logo" /></RouterLink>
          </div>
          <!-- Aquí puedes clonar el menú si lo necesitas -->
          <div class="te-menu-sidebar-content">
            <div class="te-menu-sidebar-single-widget">
              <div class="about-info text-white">
                <p>Tempor turpis nisl dui ut facilisi tempus at dew euismod...</p>
              </div>
            </div>
            <div class="te-menu-sidebar-single-widget">
              <h5 class="te-menu-sidebar-title">Contact Info</h5>
              <div class="te-header-contact-info">
                <span><i class="fa-solid fa-location-dot"></i>6391 Elgin St. Celina, 10299</span>
                <span><a href="mailto:info@example.com"><i class="fa-solid fa-envelope"></i>info@example.com</a> </span>
                <span><a href="tel:+123-456-7890"><i class="fa-solid fa-phone"></i>+123-456-7890</a></span>
              </div>
              <div class="te-social-profile">
                <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
                <a href="#"><i class="fa-brands fa-twitter"></i></a>
                <a href="#"><i class="fa-brands fa-linkedin-in"></i></a>
                <a href="#"><i class="fa-brands fa-youtube"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Overlay -->
    <div class="te-body-overlay" :class="{ 'active': isSidebarOpen }" @click="closeSidebar"></div>

    <!-- Page header -->
    <div class="page-breadcrumb-area">
      <div class="page-bg">
        <div class="page-overlay" style="background-color: rgba(6, 6, 6, 0.7);"></div>
        <img src="../assets/images/section-bg/page-header.jpg" alt="page header">
      </div>
      <div class="container">
        <div class="row"><div class="col-md-12">
          <div class="breadcrumb-wrapper">
            <div class="page-heading"><h3 class="page-title">Service</h3></div>
            <div class="breadcrumb-list">
              <ul>
                <li><RouterLink to="/">Home</RouterLink></li>
                <li class="active"><a href="#">Service</a></li>
              </ul>
            </div>
          </div>
        </div></div>
      </div>
    </div>

    <!-- Services grid -->
    <div class="service-page-area te-py-120">
      <div class="container">
        <div class="row gy-4">

          <!-- Repite tarjetas como necesites (puedes mapear desde un array) -->
          <div class="col-md-6 col-lg-4" v-for="i in 9" :key="i">
            <div class="te-info-card style-2">
              <div class="te-info-card-inner">
                <div class="icon">
                  <img :src="`/images/icon/info-card/v-2/icon-${(i % 9) || 1}.png`" alt="image"/>
                </div>
                <div class="te-content-wrapper">
                  <div class="te-title-wrapper">
                    <h3 class="title"><a href="#">Service {{ i }}</a></h3>
                  </div>
                  <div class="content">
                    <p class="desc">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                  </div>
                  <div class="read-btn">
                    <a href="#">READ MORE<i class="fa fa-solid fa-arrow-right"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div> <!-- /row -->
      </div>
    </div>

    <!-- Footer (idéntico al HTML) -->
    <footer class="footer style-1 background-gray-700">
      <!-- ... (el mismo contenido del footer del HTML) ... -->
      <div class="te-footer-sec">
        <div class="container">
          <div class="row gy-5">
            <!-- copia aquí las 4 columnas como en el HTML original -->
          </div>
        </div>
      </div>
      <div class="footer-bottom-area">
        <div class="container">
          <div class="row"><div class="col-12">
            <div class="te-footer-bottom-wrapper">
              <div class="te-copyright-text">
                <p>&copy; <a href="#">Blackhawak</a> 2025 | All Rights Reserved</p>
              </div>
              <div class="te-footer-bottom-menu">
                <ul>
                  <li><a href="#">Terms & Condition</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                  <li><a href="#">Contact Us</a></li>
                </ul>
              </div>
            </div>
          </div></div>
        </div>
      </div>
    </footer>

    <!-- Scroll to top (svg ya está en CSS/JS del tema) -->
    <div class="progress-wrap">
      <svg class="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
        <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"/>
      </svg>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const showPreloader = ref(true)
const isSidebarOpen = ref(false)

const toggleSidebar = () => { isSidebarOpen.value = !isSidebarOpen.value }
const closeSidebar = () => { isSidebarOpen.value = false }

onMounted(() => {
  // Oculta el preloader después de un instante (o cuando cargues datos).
  setTimeout(() => { showPreloader.value = false }, 400)
})
</script>
