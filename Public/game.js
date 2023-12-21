const { Client, Account, Databases, Id, Query } = Appwrite
const projectId = '6581d272c84de8ff2365'
const databaseId = '6584c1d8b42317e03323'
const collectionId = '6584c1f9671c1a576452'

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(projectId)

const account = new Account(client)
const database = new Databases(client)

function registar(event) {
    account.create(
        Id.unique(),
        event.target.elements['registar-email'].value,
        event.target.elements['registar-password'].value,
        event.target.elements['registar-username'].value
    ).then(response => {
        console.log(response)
        database.createDocument(
            databaseId,
            collectionId,
            response.$id,
            {
                "userId": response.$id,
                "highscore": 0
            }
    )

        account.createEmailSession(
            event.target.elements['registar-email'].value,
            event.target.elements['registar-password'].value
        )
    }).catch(error => console.error(error))
    event.preventDefault()

}
