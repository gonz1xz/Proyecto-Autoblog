const form = document.getElementById('formulario-opinion');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = document.getElementById('message').value;
    const fechaSinFormatear = new Date();

    const dia = String(fechaSinFormatear.getDate()).padStart(2, '0');
    const mes = String(fechaSinFormatear.getMonth() + 1).padStart(2, '0');
    const anio = String(fechaSinFormatear.getFullYear());
    const hora = String(fechaSinFormatear.getHours()).padStart(2, '0');
    const minutos = String(fechaSinFormatear.getMinutes()).padStart(2, '0');

    // Formatear la fecha en el formato "dd/mm/yyyy"
    const fecha = `${dia}/${mes}/${anio} ${hora}:${minutos}`;

    axios.post('/comments', { message, fecha })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.error(error);
        });

    alert("Comentario Recibido!");
    window.location.reload();
    form.reset();
});
