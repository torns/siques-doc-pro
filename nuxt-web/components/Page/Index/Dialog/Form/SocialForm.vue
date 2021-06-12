<template>
  <div class="social-container">
    <div class="wrapper">
      <div class="icon facebook">
        <div class="tooltip">Facebook</div>
        <span><i class="fab fa-facebook-f"></i></span>
      </div>
      <div class="icon twitter">
        <div class="tooltip">Twitter</div>
        <span><i class="fab fa-twitter"></i></span>
      </div>
      <div class="icon instagram">
        <div class="tooltip">Instagram</div>
        <span><i class="fab fa-instagram"></i></span>
      </div>
      <div class="icon github">
        <div class="tooltip">Github</div>
        <span><i class="fab fa-github"></i></span>
      </div>
      <div class="icon youtube">
        <div class="tooltip">Youtube</div>
        <span><i class="fab fa-youtube"></i></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
@Component({})
export default class SocialForm extends Vue {}
</script>

<style lang="scss">
#login .social-container {
  margin: 0px 0 15px 0;
}

#login .social-container a {
  border: 1px solid #dddddd;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0px 0 15px 0;

  width: 40px;
}

@import url('https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-M/font-awesome/5.15.2/css/all.min.css');
/*
    Auther: Abdelrhman Said
*/

#login .wrapper {
  display: inline-flex;
}

#login .wrapper .icon {
  position: relative;
  background-color: #ffffff;
  border-radius: 50%;
  padding: 15px;
  margin: 10px;
  width: 35px;
  height: 35px;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

#login .wrapper .tooltip {
  position: absolute;
  top: 0;
  font-size: 14px;
  width: 100px;
  background-color: #ffffff;
  color: #ffffff;
  padding: 5px 8px;
  border-radius: 5px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.icon {
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: initial !important;
}

#login .wrapper .tooltip::before {
  position: absolute;
  content: '';
  height: 8px;
  width: 8px;
  background-color: #ffffff;
  bottom: -3px;
  left: 50%;
  transform: translate(-50%) rotate(45deg);
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

#login .wrapper .icon:hover .tooltip {
  top: -45px;
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

#login .wrapper .icon:hover span,
#login .wrapper .icon:hover .tooltip {
  text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.1);
}

#login .wrapper .facebook:hover,
#login .wrapper .facebook:hover .tooltip,
#login .wrapper .facebook:hover .tooltip::before {
  background-color: #3b5999;
  color: #ffffff;
}

#login .wrapper .twitter:hover,
#login .wrapper .twitter:hover .tooltip,
#login .wrapper .twitter:hover .tooltip::before {
  background-color: #46c1f6;
  color: #ffffff;
}

#login .wrapper .instagram:hover,
#login .wrapper .instagram:hover .tooltip,
#login .wrapper .instagram:hover .tooltip::before {
  background-color: #e1306c;
  color: #ffffff;
}

#login .wrapper .github:hover,
#login .wrapper .github:hover .tooltip,
#login .wrapper .github:hover .tooltip::before {
  background-color: #333333;
  color: #ffffff;
}

#login .wrapper .youtube:hover,
#login .wrapper .youtube:hover .tooltip,
#login .wrapper .youtube:hover .tooltip::before {
  background-color: #de463b;
  color: #ffffff;
}
</style>
