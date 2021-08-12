var FormEvaluate = {
  head: '<div>',
  content: `
    <form id="formEvaluateMapPoint">
      <div class="form-group">
        <label for="">Latitud</label>
        <input type="text" name="lat" id="lat" class="form-control" readonly>
      </div>
      <div class="form-group">
        <label for="">Longitud</label>
        <input type="text" name="lng" id="lng" class="form-control" readonly>
      </div>
      <div class="form-group">
        <label for="">Localidad</label>
        <input type="text" name="localidad" id="localidad" class="form-control" readonly>
      </div>
      <div class="form-group">
        <label for="">Seguridad</label>
        <select name="seguridad" id="security" class="form-select">
          <option>seguro</option>
          <option>inseguro</option>
          <option>muy inseguro</option>
          <option>peligroso</option>
          <option>muy peligroso</option>
        </select>
      </div>
      <div class="form-group">
        <label for="">Nivel de afectación a la salud</label>
        <select name="salud" id="security" class="form-select">
          <option>muy saludable</option>
          <option>saludable</option>
          <option>no saludable</option>
          <option>perjudicial</option>
          <option>muy perjudicial</option>
        </select>
      </div>
      <div class="form-group">
        <label for="">Calidad del ambiente</label>
        <select name="ambiente" id="security" class="form-select">
          <option>muy agradable</option>
          <option>agradable</option>
          <option>indiferente</option>
          <option>desagradable</option>
          <option>muy desagradable</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary my-4">Registrar</button>
    </form>
  `,
  footer:'</div>',
  setContent: (content) => {
    FormEvaluate.content = content
  },
  toString: () => FormEvaluate.head+FormEvaluate.content+FormEvaluate.footer
}

export default FormEvaluate;