import { firebase_app } from './../Config/Config';



export const getAllEvents = async () => {
  const docRef = firebase_app.firestore().collection('eventos')
  const docs = await docRef.get()
  let eventos = []
  docs.forEach((doc) => {
    let obj = doc.data();
    obj.id = doc.id
    eventos.push(obj)
  })
  if (eventos.length > 0) {
    return eventos
  } else {
    throw new Error('Eventos não encontrados')
  }
}

export const deleteEvent = async (id) => {
  try {
    await firebase_app.firestore().collection('eventos').doc(id).delete()
    return true
  } catch (e) {
    throw new Error('Erro')
  }
}

export const getEscataByDay = async (data) => {
  const docRef = firebase_app.firestore().collection('eventos')
  const snapshot = await docRef.where('data', '==', data).get();
  console.log(snapshot)
  if (!snapshot.empty) {
    let response = []
    snapshot.forEach(doc => {
      response.push(doc.data());
    });
    return response
  } else {
    throw new Error('Sem eventos cadastrados nesse dia')
  }
}

export const updateEvent = async (value) => {
  const res = await firebase_app.firestore().collection('eventos').doc(value.id).set(value)
  console.log(res)
  return res
}

export const createEvent = async (value) => {
  const res = await firebase_app.firestore().collection('eventos').doc().set(value);
  return res
}

export const createCliente = async (uid, value) => {
  const res = await firebase_app.firestore().collection('clientes').doc(uid).set(value);
  return res
}

export const getCliente = async (uid) => {
  const docRef = firebase_app.firestore().collection('clientes').doc(uid)
  const doc = await docRef.get()
  if (doc.exists) {
    return doc.data()
  } else {
    throw new Error('Cliente não encontrado')
  }
}

export const getAllClientes = async () => {
  console.log(firebase_app)
  const docRef = firebase_app.firestore().collection('clientes')
  const docs = await docRef.get()
  let clientes = []
  docs.forEach((doc) => {
    clientes.push(doc.data())
  })
  if (clientes.length > 0) {
    return clientes
  } else {
    throw new Error('Clientes não encontrados')
  }
}

export const updateCliente = async (uid, value) => {
  const res = await firebase_app.firestore().collection('clientes').doc(uid).set(value)
  console.log(res)
  return res
}

export const addDataToCliente = async (uid, value) => {
  const res = await firebase_app.firestore().collection('clientes').doc(uid).update(value)
  console.log(res)
  return res
}

export const markAllTask = (action) => {
  const db = firebase_app.firestore();
  db.collection('todo')
    .get()
    .then(snapshot => {
      snapshot
        .docs
        .forEach(doc => {
          db.collection('todo').doc(doc.id).set({ task: doc.data().task, completed: action });
        });
    });
}
