let FormConsult = {
  head:"<div>",
  content:`
    <h2>Consulta de Percepción</h2>
    <select id="criterioType" class="form-select">
      <option value="0">General</option>
      <option value="1">Seguridad</option>
      <option value="2">Salud</option>
      <option value="3">Ambiental</option>
    </select>
  `,
  footer:"</div>",
  setContent() {
    FormConsult.content=content;

  },
  toString() {
    return FormConsult.head+FormConsult.content+FormConsult.footer;
  }
}


export default FormConsult