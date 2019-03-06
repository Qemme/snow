if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

const uuid = require('uuid/v4'); // ES5
const storage = require('azure-storage');
const containerName = 'demo';
const blobService = storage.createBlobService();
const groningen = { lat: 53.2217873, lng: 6.4956536 }; 


const listBlobs = async () => {
  return new Promise((resolve, reject) => {
      blobService.listBlobsSegmented(containerName, null, (err, data) => {
          if (err) {
              reject(err);
          } else {
              resolve({ message: `${data.entries.length} blobs in '${containerName}'`, blobs: data.entries });
          }
      });
  });
};

const seeder = {};
seeder.apply = async (db)=>{
  let mnuId=1;  
 
  var user = await db
    .User.create({
      id: '1223ff59-7a5e-4add-ab7c-981f5e3d2237',
      firstName: 'GeertJan',
      lastName: 'Kemme',
      email: 'geertjan@whitebytes.nl',
      password: '$2b$10$7mCWBa6PrsmPKzjaQwOq0e2wErA/L610Jk3hvPgYq1rFm0b80iEh2'
    });
    
    var connector = await db.Connector.create({
      id:uuid(),
      name:'Azure',
      props:{}
    })
  
    listBlobs().then(({blobs})=>{
        blobs.map((item,index)=>{
          var idx = item.name.lastIndexOf('.');
          db.MediaRaw.create({
            id:uuid(),
            name: item.name.substring(0, idx-1),
            type: item.name.substring(idx),
            connectorId:connector.id, //azure
            userOwner: user.id,
            blobRef: `https://whitebytes.blob.core.windows.net/${containerName}/${item.name}`,
            props:{
              lat: groningen.lat +
                0.01 * index *
                Math.sin(30 * Math.PI * index / 180) *
                Math.cos(50 * Math.PI * index / 180) + Math.sin(5 * index / 180),
            lng: groningen.lng +
              0.01 * index *
              Math.cos(70 + 23 * Math.PI * index / 180) *
              Math.cos(50 * Math.PI * index / 180) + Math.sin(5 * index / 180)
            }
          })
        })
    }) 

    try {
      await db.Module.create({
        id: 1,
        name: 'Me',
        icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'
      });

        await db.MenuItem.create({
          id: mnuId++,
          name: 'Logon',
          moduleId: 1,
          url: '/me/Logon',
          icon: 'M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM9 8V6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9z'
        });
 
        await db.MenuItem.create({
          id: mnuId++,
          name: 'Logoff',
          moduleId: 1,
          url: '/me/Logoff',
          icon: 'M12 13c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6-5h-1V6c0-2.76-2.24-5-5-5-2.28 0-4.27 1.54-4.84 3.75-.14.54.18 1.08.72 1.22.53.14 1.08-.18 1.22-.72C9.44 3.93 10.63 3 12 3c1.65 0 3 1.35 3 3v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 11c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1v-8c0-.55.45-1 1-1h10c.55 0 1 .45 1 1v8z'
        });
        await db.MenuItem.create({
          id: mnuId++,
          name: 'Github',
          moduleId: 1,
          url: 'https://github.com/Whitebytes/snow',
          icon: 'M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z'
        });

        await db.Module.create({
          id: 2,
          name: 'Media',
          icon: 'M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z'
        });
        await db.MenuItem.create({
          id: mnuId++,
          name: 'Browse media',
          url: '/media',
          moduleId: 2,
          icon: 'M10.59 4.59C10.21 4.21 9.7 4 9.17 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-1.41-1.41z'
        });
        await db.MenuItem.create({
          id: mnuId++,
          name: 'Geo media',
          url: '/media/ByGeoLoc',
          moduleId: 2,
          icon: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'
        });

        await db.MenuItem.create({
          id: mnuId++,
          name: 'Upload media',
          url: '/media/Upload',
          moduleId: 2,
          icon: 'M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l4.65-4.65c.2-.2.51-.2.71 0L17 13h-3z'
        });
        await db.MenuItem.create({
            id: mnuId++,
            name: 'Manage labels',
            url: '/media/Labels',
            moduleId: 2,
            icon: 'M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84l3.96-5.58c.25-.35.25-.81 0-1.16l-3.96-5.58z'
          });

          await db.Module.create({
            id: 3,
            name: 'Administrate',
            
            icon: 'M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z'
          });

          await db.MenuItem.create({
            id: mnuId++,
            name: 'Manage users',
            moduleId: 3,
            url: '/manage/Users',
            icon: 'M16.5 12c1.38 0 2.49-1.12 2.49-2.5S17.88 7 16.5 7 14 8.12 14 9.5s1.12 2.5 2.5 2.5zM9 11c1.66 0 2.99-1.34 2.99-3S10.66 5 9 5 6 6.34 6 8s1.34 3 3 3zm7.5 3c-1.83 0-5.5.92-5.5 2.75V18c0 .55.45 1 1 1h9c.55 0 1-.45 1-1v-1.25c0-1.83-3.67-2.75-5.5-2.75zM9 13c-2.33 0-7 1.17-7 3.5V18c0 .55.45 1 1 1h6v-2.25c0-.85.33-2.34 2.37-3.47C10.5 13.1 9.66 13 9 13z'
          });
          await db.MenuItem.create({
            id: mnuId++,
            name: 'Pregnant woman',
            url: '/manage/Pregnant',
            moduleId: 3,
            icon: 'M9 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm7 9c-.01-1.34-.83-2.51-2-3 0-1.71-1.42-3.08-3.16-3C9.22 7.09 8 8.54 8 10.16V16c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V17h2c.55 0 1-.45 1-1v-3z'
          });
      }
      catch(e){console.log(e)}
      
}

export default seeder;