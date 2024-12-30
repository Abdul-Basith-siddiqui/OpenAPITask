
const dummyFile = new File(['Hello, world!'], 'image.jpg', { type: 'image/jpeg' });


export const dummyData = [
  {
    data: {
      petId: 123,
      additionalMetadata: "Sample metadata",
      file: dummyFile,
    },
  },
  {
    data: 
      {
        id: 0,
        category: {
          id: 0,
          name: "string"
        },
        name: "doggie",
        photoUrls: [
          "string"
        ],
        tags: [
          {
            id: 0,
            name: "string"
          }
        ],
        status: "available"
      },
    
  },
  {
    data: {
      id: 0,
      category: {
        id: 0,
        name: "string"
      },
      name: "doggie",
      photoUrls: [
        "string"
      ],
      tags: [
        {
          id: 0,
          name: "string"
        }
      ],
      status: "available"
    }
  },
  {
    query: {
      status: "available",
    },
  },
  {
    query: {
      tags: ["tag1", "tag2"],
    },
  },
  {
    data: {
      petId: 0,
    },
  },
  {
    data: {
      petId: 123,
      name: "Buddy",
      status: "sold",
    },
  },
  {
    headers: {
      api_key: "12345",
    },
    params: {
      petId: 123,
    },
  },
  {
    data: {},
  },
  {
    data: {
      body: {
        id: 1,
        petId: 123,
        quantity: 2,
        shipDate: "2024-01-01T00:00:00.000Z",
        status: "placed",
        complete: true,
      },
    },
  },
  {
    params: {
      orderId: 1,
    },
  },
  {
    params: {
      orderId: 1,
    },
  },

  {
    data: {
      body: [
        {
          "id": 0,
          "username": "string",
          "firstName": "string",
          "lastName": "string",
          "email": "string",
          "password": "string",
          "phone": "string",
          "userStatus": 0
        }
      ]
    },
  },
];