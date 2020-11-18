/*#######################################################################
# - Dependências :                                                      #
#######################################################################*/
import axios from 'axios';


//Criando instância de comunicação com servidor Back-end :
const api = axios.create({
    baseURL: 'http://localhost:3333'
});

export default api;