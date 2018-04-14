export const emailValidation = dados => {
    if (dados === '') {
      return { mensagem: 'Por favor, insira seu e-mail.', tipo: false };
    } else {
      if (!dados.includes('@')) {
        return { mensagem: 'O email deve conter "@".', tipo: false };
      } else {
        if (
          !dados.split('@')[1].includes('.') ||
          dados.split('@')[0].length === 0
        ) {
          return { mensagem: 'Erro na formatação do email', tipo: false };
        } else {
          if (dados.split('@')[1].split('.')[0].length === 0) {
            return {
              mensagem: 'Erro na formatação do email - domínio inválido',
              tipo: false,
            };
          } else {
            if (
              dados.split('@')[1].split('.')[
                dados.split('@')[1].split('.').length - 1
              ].length === 0
            ) {
              return {
                mensagem: 'Erro na formatação do email - email inválido',
                tipo: false,
              };
            } else {
              return { mensagem: 'Email Válido', tipo: true };
            }
          }
        }
      }
    }
  };
  
  export async function useAPI(UserKey, api, method, body) {
    let dados = [];
    if (method === 'GET') {
      await fetch('https://api2-dev.ploomes.com/' + api, {
        method: method,
        headers: {
          'User-Key': UserKey,
        },
      })
        .then(response => response.json())
        .then(responseJson => {
          dados = responseJson.value;
        });
  
      return dados;
    } else {
      fetch('https://api2-dev.ploomes.com/' + api, {
        method: 'POST',
        headers: {
          'User-Key': UserKey,
        },
        body: JSON.stringify(body),
      })
        .then(response => response.json())
        .then(responseJson => {
          dados = responseJson.value;
        });
    }
  }
  
  export function mapData(data) {
    const dataNew = data.map(item => {
      var obj = { value: item.Name, id: item.Id };
      return obj;
    });
    return dataNew;
  }
  
  export function formatPhone(phone) {
    phone = phone.replace(/\D/g, '');
    phone = phone.replace(/^(\d{2})(\d)/g, '($1) $2');
    phone = phone.replace(/(\d)(\d{4})$/, '$1-$2');
  
    return phone;
  }
  
  export function objPhone(phoneTypes, phoneData) {
    let obj = {};
    let k = 0;
    for (k in Object.keys(phoneData)) {
      for (i in Object.keys(phoneTypes)) {
        if (phoneData[k].type === phoneTypes[i].Name) {
          if (phoneData[k].phone === '') {
          } else {
            let len = Object.keys(obj);
            obj[len.length] = {
              PhoneNumber: phoneData[k].phone,
              TypeId: phoneTypes[i].Id,
            };
          }
        }
      }
    }
    return(obj);
  }

