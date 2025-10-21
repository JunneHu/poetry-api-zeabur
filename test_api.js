// 测试API的脚本
const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api/poetry';

// 测试数据
const testPoetry = {
  title: "咏鹅",
  author: "骆宾王",
  dynasty: "唐",
  content: ["鹅，鹅，鹅，", "曲项向天歌。", "白毛浮绿水，", "红掌拨清波。"],
  tags: []
};

async function testCreatePoetry() {
  try {
    console.log('测试创建诗句...');
    const response = await axios.post(BASE_URL, testPoetry);
    console.log('创建结果:', JSON.stringify(response.data, null, 2));
    return response.data.data?.id;
  } catch (error) {
    console.error('创建失败:', error.response?.data || error.message);
    return null;
  }
}

async function testGetPoetryList() {
  try {
    console.log('\n测试获取诗句列表...');
    const response = await axios.get(`${BASE_URL}/list?page=1&limit=10`);
    console.log('列表结果:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('获取列表失败:', error.response?.data || error.message);
  }
}

async function testGetPoetryById(id) {
  if (!id) return;
  
  try {
    console.log(`\n测试获取诗句详情 - 查询参数方式 (ID: ${id})...`);
    const response1 = await axios.get(`${BASE_URL}/getPoetryById?id=${id}`);
    console.log('查询参数方式结果:', JSON.stringify(response1.data, null, 2));
    
    console.log(`\n测试获取诗句详情 - RESTful方式 (ID: ${id})...`);
    const response2 = await axios.get(`${BASE_URL}/${id}`);
    console.log('RESTful方式结果:', JSON.stringify(response2.data, null, 2));
  } catch (error) {
    console.error('获取详情失败:', error.response?.data || error.message);
  }
}

async function runTests() {
  console.log('开始API测试...\n');
  
  // 测试创建
  const poetryId = await testCreatePoetry();
  
  // 测试列表
  await testGetPoetryList();
  
  // 测试详情
  await testGetPoetryById(poetryId);
  
  console.log('\n测试完成！');
}

// 运行测试
runTests();