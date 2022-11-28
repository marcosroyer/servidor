import express from "express";
import * as dotenv from "dotenv";

const app = express();

dotenv.config();

app.use(express.json());

const bancoDados = [
  {
    id: "e27ab2b1-cb91-4b18-ab90-5895cc9abd29",
    documentName: "Licitação Enap - Curso Web Dev",
    status: "Em andamento",
    details:
      "Processo para capacitação de servidores públicos em desenvolvimento de aplicações na WEB. Parceria com Ironhack.",
    dateInit: "28/11/2022",
    comments: [
      "Processo aberto",
      "Processo partiu para as partes assinarem",
      "Processo agora está em análise final",
      "Process já tem data final",
    ],
    dateEnd: "16/12/2022",
    setor: "enap",
  },
  {
    id: "ee5999d7-02e9-4b3d-a1ab-f067-f067eef54173",
    documentName: "Licitação Compras - Notebooks",
    status: "Em andamento",
    details: "Processo de licitação para compra de notebooks",
    dateInit: "30/11/2022",
    comments: ["Processo em aberto e sem previsão de conclusão"],
    dateEnd: "",
    setor: "tre",
  },
  {
    id: "c974e448-489c-4936-8d29-08564c80b736",
    documentName: "Licitação Compras - Ar Condicionado",
    status: "Finalizado",
    details: "Processo de licitação para compra de ar-condicionado",
    dateInit: "15/11/2022",
    comments: ["Processo em aberto", "Processo finalizado"],
    dateEnd: "25/11/2022",
    setor: "trj",
  },
];

app.get("/all", (req, res) => {
  return res.status(200).json(bancoDados);
});

app.post("/create", (req, res) => {
  console.log(`processo created. ID: ${req.body.id}`);
  bancoDados.push(req.body);
  console.log(bancoDados);
  return res.status(201).json(res.body);
});

app.put("/edit/:id", (req, res) => {
  const { id } = req.params;

  const processo = bancoDados.find((processo) => {
    return processo.id === id;
  });
  const clone = { ...processo, ...req.body };
  const index = bancoDados.indexOf(processo);
  bancoDados.splice(index, 1, clone);
  console.log(bancoDados);
  return res.status(201).json(clone);
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  const processo = bancoDados.find((processo) => {
    return processo.id === id;
  });

  const index = bancoDados.indexOf(processo);
  bancoDados.splice(index, 1);

  return res.status(201).json(processo);
});

app.get("/process/:id", (req, res) => {
  const { id } = req.params;
  const processo = bancoDados.find((processo) => {
    return processo.id === id;
  });

  return res.status(201).json(processo);
});

app.get("/status/open", (req, res) => {
  const processos = bancoDados.filter((processo) => {
    return processo.status === "Em andamento";
  });

  return res.status(201).json(processos);
});

app.get("/status/close", (req, res) => {
  const processos = bancoDados.filter((processo) => {
    return processo.status === "Finalizado";
  });

  return res.status(201).json(processos);
});

app.put("/addComment/:id", (req, res) => {
  const { id } = req.params;

  const processo = bancoDados.find((processo) => {
    return processo.id === id;
  });
  const clone = { ...req.body };
  const index = bancoDados.indexOf(processo);
  bancoDados.splice(index, 1, clone);

  return res.status(201).json(clone);
});

app.get("/setor/:nomeSetor", (req, res) => {
  const { nomeSetor } = req.params;
  const processos = bancoDados.filter((processo) => {
    return processo.setor === nomeSetor;
  });

  return res.status(201).json(processos);
});

app.get("/random", (req, res) => {
  const index = Math.floor(Math.random() * bancoDados.length);

  return res.status(201).json(bancoDados[index]);
});

app.listen(process.env.PORT, () => {
  console.log(`Server up and running on http://localhost/${process.env.PORT}`);
});
