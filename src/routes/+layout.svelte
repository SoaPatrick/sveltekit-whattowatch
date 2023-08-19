<header>
  <nav>
    <a href="/">
      <div class="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="currentColor"
          ><path d="M0 0h24v24H0z" fill="none" /><path
            d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"
          /></svg
        >
      </div>
      <span>Home</span>
    </a>
    <a href="/movie">
      <div class="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="currentColor"
          ><path d="M0 0h24v24H0z" fill="none" /><path
            d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"
          />
        </svg>
      </div>
      <span>Movies</span>
    </a>
    <a href="/tv">
      <div class="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="currentColor"
          ><path d="M0 0h24v24H0z" fill="none" /><path
            d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"
          /></svg
        >
      </div>
      <span>Shows</span>
    </a>
    <a href="/">
      <div class="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="currentColor"
          ><path d="M0 0h24v24H0z" fill="none" /><path
            d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
          /></svg
        >
      </div>
      <span>Profile</span>
    </a>
    <a href="/search">
      <div class="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="currentColor"
          ><path d="M0 0h24v24H0z" fill="none" /><path
            d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
          /></svg
        >
      </div>
      <span>Search</span>
    </a>
  </nav>
</header>

<div class="container">
  <slot />
</div>
<footer>
  <img src="/tmdb-logo.svg" alt="TMDB" />
  <div>
    This product uses the TMDB API but is not endorsed or certified by TMDB.
  </div>
</footer>

<style>
  .container {
    width: 1200px;
    max-width: calc(100% - 40px);
    margin: 0 auto;
    padding: 50px 20px;
    flex: 1;
  }

  footer {
    background: #ddd;
    padding: 50px 20px;
    margin-bottom: 70px;
  }

  header {
    position: fixed;
    z-index: 9999;
    bottom: 0;
    left: 0;
    width: 100%;
    background: var(--color__primary);
    color: var(--color__egg--200);
  }

  header a {
    color: inherit;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h1 {
    margin: 0;
  }

  nav {
    padding: 15px 20px 20px 20px;
    display: flex;
    gap: 20px;
    justify-content: space-between;
    font-size: 12px;
  }

  footer {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    align-items: center;
  }

  footer img {
    width: 200px;
    height: auto;
  }
</style>
