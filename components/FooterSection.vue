<template>
  <footer aria-labelledby="footer-heading">
    <h2 id="footer-heading" class="sr-only">
      Footer
    </h2>
    <div class="mx-auto max-w-md px-4 sm:max-w-7xl sm:px-6 lg:px-8">
      <div class="py-6">
        <p class="text-base text-gray-400 xl:text-center">
          &copy; 2023 ZS.
        </p>



      </div>
    </div>
  </footer>
</template>

<style>
footer {
  background-color: #ace0f9;
  background-image: linear-gradient(135deg, #fff1eb 0%, #ace0f9 40%, #9bbbfc 60%, #e6f0ff 100%);
  background: -webkit-linear-gradient(135deg,
      #fff1eb 0%,
      #ace0f9 40%,
      #9bbbfc 60%,
      #e6f0ff 100%);
  background-size: 200% 200%;
  animation: shine 8s infinite alternate;
}


@keyframes shine {
  from {
    background-position: 0 0;
  }

  to {
    background-position: 100% 100%
  }
}
</style>
