export default function LoginPage() {
  function submitLoginForm(formData) {
    const email = formData.get("email");
    const password = formData.get("password");

    console.log(`${email}, ${password}`);
  }

  return (
    <>
      <header>
        <img src="" alt="" ></img>
      </header>
      <main>
        <form action={submitLoginForm}>
          <label htmlFor="email" defaultValue="p@p.com">
            Email:
          </label>
          <input id="email" type="email" name="email" />
          <br />
          <label htmlFor="password" defaultValue="p@p.com">
            Password:
          </label>
          <input id="password" type="password" name="password" />
          <br />
          <button type="submit">Login</button>
        </form>
      </main>
    </>
  );
}
