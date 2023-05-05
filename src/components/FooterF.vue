<template>
  <!-- ======= Footer ======= -->
  <footer id="footer" class="footer">

    <div class="container">
      <div class="row gy-3 d-flex align-items-center justify-content-between">
        <div class="col-lg-3 col-md-6">
          <div>
            <h4>Credits</h4>
            <p style="width: max-content;">
              Food Images Designed by <a href="http://www.freepik.com" target="_blank">Freepik</a>
              <br>
              Website Bootstrap Templates Designed by <a href="https://bootstrapmade.com/" target="_blank">BootstrapMade</a>
              <br>
            </p>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 footer-links">
          <h4>Follow Creator</h4>
          <div class="social-links d-flex">
            <a href="https://twitter.com/YazidKurdiR" class="twitter"><i class="bi bi-twitter"></i></a>
            <a href="https://www.linkedin.com/in/yazid-kurdi-066b53181/" class="linkedin"><i class="bi bi-linkedin"></i></a>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="copyright">
        &copy; Copyright <strong><span>Recipe</span></strong>. All Rights Reserved
      </div>
    </div>

  </footer><!-- End Footer -->
</template>

<script setup>

</script>

<style scoped>
.footer {
  font-size: 14px;
  background-color: #1f1f24;
  padding: 40px 0;
  color: rgba(255, 255, 255, 0.7);
}

h4 {
  font-size: 16px;
  font-weight: bold;
  position: relative;
  padding-bottom: 5px;
  color: #fff;
}

.footer-links {
  margin-bottom: 10px;
}

.social-links a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  margin-right: 10px;
  transition: 0.3s;
}

.footer .social-links a:hover {
  color: #fff;
  border-color: #fff;
}

.copyright {
  text-align: center;
  padding-top: 15px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
</style>