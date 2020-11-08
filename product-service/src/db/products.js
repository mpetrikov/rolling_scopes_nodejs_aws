import { dbOptions } from './connection';
import * as pg from "pg";

const { Client } = pg;

const allProductsQuery = `select id, title, price, image, count from products p
inner join stocks s on p.id = s.product_id`;

export const getProductList = async () => {
    const client = new Client(dbOptions);
    let stockItems = [];

    try {
        await client.connect();
        
        const { rows: allProductsRows } = await client.query(allProductsQuery);
        stockItems = allProductsRows;
    }finally {
        client.end();
    }

    return stockItems;
}
