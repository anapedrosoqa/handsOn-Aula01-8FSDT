document
  .getElementById("formGrupo")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita o reload da página

    // Captura os campos de nome e o campo de história
    const nomesInputs = document.querySelectorAll('input[name="nome"]');
    const historiaInput = document.querySelector('textarea[name="historia"]');

    // Cria o array de nomes (somente os preenchidos)
    const nomes = Array.from(nomesInputs)
      .map((input) => input.value.trim())
      .filter((nome) => nome !== "");

    const historia = historiaInput.value.trim();

    // Verifica se todos os campos obrigatórios estão preenchidos
    if (nomes.length === 0 || historia === "") {
      alert("Por favor, preencha todos os campos antes de enviar.");
      return;
    }

    // Monta o objeto JSON conforme especificado
    const dados = {
      names: nomes,
      message: historia,
    };

    try {
      const resposta = await fetch(
        "https://fsdt-contact.onrender.com/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dados),
        }
      );

      // Se a resposta for bem-sucedida (status 200–299)
      if (resposta.ok) {
        // Limpa todos os campos
        nomesInputs.forEach((input) => (input.value = ""));
        historiaInput.value = "";

        alert("Informações enviadas com sucesso!");
      } else {
        // Se o servidor responder com erro (ex: 400, 500)
        alert(
          "Ocorreu um erro ao enviar as informações. Tente novamente mais tarde."
        );
      }
    } catch (erro) {
      // Se ocorrer qualquer erro de rede ou exceção no código
      console.error("Erro ao enviar:", erro);
      alert(
        "Ocorreu um erro ao enviar as informações. Verifique sua conexão e tente novamente."
      );
    }
  });
