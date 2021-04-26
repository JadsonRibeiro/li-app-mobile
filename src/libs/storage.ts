import AsyncStorage from '@react-native-async-storage/async-storage'

export interface Store {
    name: string;
    apiKey: string;
    apiApp: string
}

export interface StorageStoreProps {
    [apiKey: string]: {
        data: Store
    };
}

export async function saveStore(name: string, apiKey: string, apiApp: string) {
    const data = await AsyncStorage.getItem('@liapp:stores');
    const oldStores = data ? (JSON.parse(data) as StorageStoreProps) : {};

    const newStore = {
        [apiKey]: { 
            data: { name, apiKey, apiApp }
        }
    };

    await AsyncStorage.setItem('@liapp:stores', JSON.stringify({
        ...oldStores,
        ...newStore
    }));
}

export async function loadStores(): Promise<Store[]> {
    const data = await AsyncStorage.getItem('@liapp:stores');
    const storagedStores = data ? JSON.parse(data) : {};

    console.log('Storaged Stores', storagedStores);

    const storesList = Object
        .keys(storagedStores)
        .map(apiKey => (storagedStores[apiKey].data))

    return storesList;
}

export async function deleteStore(apiKey: string) {
    const data = await AsyncStorage.getItem('@liapp:stores');
    const storagedStores = data ? JSON.parse(data) : {};

    console.log('Storaged Stores', storagedStores);

    delete storagedStores[apiKey];

    await AsyncStorage.setItem('@liapp:stores', JSON.stringify(storagedStores));
}