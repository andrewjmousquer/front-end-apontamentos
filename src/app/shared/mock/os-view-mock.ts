export let osViewListMock = [
    {
        "numberOS": '123456789',
        "brand": "Jaguar",
        "model": "F-Type",
        "plate": "YKT-5667",
        "chassi": "2u778jljW84fR8967",
        "stageName": "Em Andamento"
    },
    {
        "numberOS": '987654321',
        "brand": "Volvo",
        "model": "XC-40",
        "plate": "OPQ-1284",
        "chassi": "4C9a3Cl0b3Aum6205",
        "stageName": "Pausado"
    },
]

export let tarefasEmAndamento = [
    {
        "status": 'Ativo',
        "stage": "Desmontagem",
        "totalTime": "04:15"
    },
    {
        "status": 'Inativo',
        "stage": "Montagem",
        "totalTime": "05:35"
    },
]

export let tarefasFinalizadas = [
    {
        "stage": 'Inspeção de Entrada',
        "specialService": 'false',
        "totalTime": "10:00",
        "checklist": 'true'
    },
    {
        "stage": 'Fibra',
        "specialService": 'true',
        "totalTime": "01:20",
        "checklist": 'false'
    }
]

export let tarefasEmAberto = [
    {
        "stage": 'Montagem',
    },
    {
        "stage": 'Desmontagem Tampa',
    }
]

export let detalhamentoDeEtapas = [
    {
        "userName": "Montagem",
        "date": '01/10/1991',
        "timeStart": '09:20',
        "timeEnd": '10:20',
        "totalTime": '00:30',

    },
    {
        "userName": "Desmontagem",
        "date": '05/07/1985',
        "timeStart": '10:40',
        "timeEnd": '17:20',
        "totalTime": '02:10',

    },

]