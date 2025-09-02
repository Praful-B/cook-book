export default function RegistrationPage() {
  function heandleRegistration(formData) {
    const { email, username, password } = formData;
  }

  return (
    <form action={heandleRegistration}>
      <label htmlFor="email">Email: </label>
      <input type="email" name="email" id="email" /> <br />
      <label htmlFor="username">Username: </label>
      <input type="username" name="username" id="username" /> <br />
      <label htmlFor="passoword">Password</label>
      <input type="password" name="password" id="password" />
    </form>
  );
}
