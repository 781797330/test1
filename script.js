// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializePortal();
});

function initializePortal() {
    // 初始化侧边栏交互
    initSidebar();
    
    // 初始化聊天功能
    initChat();
    
    // 初始化功能按钮
    initFunctionButtons();
    
    // 初始化卡片交互
    initCards();
    
    // 初始化响应式功能
    initResponsive();
}

// 侧边栏交互
function initSidebar() {
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    
    sidebarItems.forEach(item => {
        item.addEventListener('click', function() {
            // 移除所有活动状态
            sidebarItems.forEach(i => i.classList.remove('active'));
            // 添加当前活动状态
            this.classList.add('active');
            
            // 这里可以添加页面切换逻辑
            const itemText = this.querySelector('span').textContent;
            console.log(`切换到: ${itemText}`);
        });
    });
}

// 聊天功能
function initChat() {
    const chatInput = document.querySelector('.chat-input');
    const sendBtn = document.querySelector('.send-btn');
    const actionBtns = document.querySelectorAll('.action-btn');
    
    // 发送消息
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            console.log('发送消息:', message);
            // 这里可以添加发送消息到后端的逻辑
            addChatMessage(message, 'user');
            chatInput.value = '';
            
            // 模拟AI回复
            setTimeout(() => {
                addChatMessage('收到您的消息，正在为您处理...', 'ai');
            }, 1000);
        }
    }
    
    // 添加聊天消息到界面
    function addChatMessage(message, sender) {
        // 这里可以添加消息显示逻辑
        console.log(`${sender}: ${message}`);
        
        // 添加到历史记录
        addToHistory(message);
    }
    
    // 添加到历史记录
    function addToHistory(message) {
        const historySection = document.querySelector('.history-section');
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.textContent = message.length > 20 ? message.substring(0, 20) + '...' : message;
        historySection.appendChild(historyItem);
    }
    
    // 发送按钮点击事件
    sendBtn.addEventListener('click', sendMessage);
    
    // 回车发送
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // 操作按钮事件
    actionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const icon = this.querySelector('i').className;
            if (icon.includes('microphone')) {
                toggleVoiceInput();
            } else if (icon.includes('image')) {
                selectImage();
            } else if (icon.includes('file')) {
                selectFile();
            }
        });
    });
}

// 语音输入
function toggleVoiceInput() {
    console.log('切换语音输入');
    // 这里可以添加语音识别功能
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.lang = 'zh-CN';
        recognition.onresult = function(event) {
            const result = event.results[0][0].transcript;
            document.querySelector('.chat-input').value = result;
        };
        recognition.start();
    } else {
        alert('您的浏览器不支持语音识别功能');
    }
}

// 选择图片
function selectImage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            console.log('选择图片:', file.name);
            // 这里可以添加图片上传逻辑
        }
    };
    input.click();
}

// 选择文件
function selectFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            console.log('选择文件:', file.name);
            // 这里可以添加文件上传逻辑
        }
    };
    input.click();
}

// 功能按钮
function initFunctionButtons() {
    const funcBtns = document.querySelectorAll('.func-btn');
    
    funcBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const funcName = this.textContent;
            console.log(`点击功能: ${funcName}`);
            
            // 添加点击效果
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // 根据功能名称执行不同操作
            switch(funcName) {
                case '投标助手':
                    openBiddingAssistant();
                    break;
                case '文档问答':
                    openDocumentQA();
                    break;
                case 'PPT生成':
                    openPPTGenerator();
                    break;
                case '录音纪要':
                    openAudioSummary();
                    break;
                case '写作':
                    openWritingAssistant();
                    break;
                case '翻译':
                    openTranslator();
                    break;
            }
        });
    });
}

// 各种功能的实现
function openBiddingAssistant() {
    console.log('打开投标助手');
    // 这里可以添加投标助手的具体逻辑
}

function openDocumentQA() {
    console.log('打开文档问答');
    // 这里可以添加文档问答的具体逻辑
}

function openPPTGenerator() {
    console.log('打开PPT生成');
    // 这里可以添加PPT生成的具体逻辑
}

function openAudioSummary() {
    console.log('打开录音纪要');
    // 这里可以添加录音纪要的具体逻辑
}

function openWritingAssistant() {
    console.log('打开写作助手');
    // 这里可以添加写作助手的具体逻辑
}

function openTranslator() {
    console.log('打开翻译功能');
    // 这里可以添加翻译功能的具体逻辑
}

// 卡片交互
function initCards() {
    const cardHeaders = document.querySelectorAll('.card-header');
    
    cardHeaders.forEach(header => {
        const chevron = header.querySelector('i');
        if (chevron) {
            chevron.addEventListener('click', function() {
                const card = this.closest('.card');
                const content = card.querySelector('.card-content');
                
                // 切换展开/收起状态
                if (content.style.display === 'none') {
                    content.style.display = 'block';
                    this.style.transform = 'rotate(90deg)';
                } else {
                    content.style.display = 'none';
                    this.style.transform = 'rotate(0deg)';
                }
            });
        }
    });
    
    // 待办事项点击
    const todoItems = document.querySelectorAll('.todo-item');
    todoItems.forEach(item => {
        item.addEventListener('click', function() {
            const content = this.querySelector('span:nth-child(2)').textContent;
            console.log('点击待办事项:', content);
            // 这里可以添加查看详情的逻辑
        });
    });
    
    // 订单追踪链接点击
    const orderLinks = document.querySelectorAll('.order-item .link');
    orderLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.stopPropagation();
            const status = this.textContent;
            console.log('查看订单状态:', status);
            // 这里可以添加查看订单详情的逻辑
        });
    });
    
    // 历史记录点击
    const historyItems = document.querySelectorAll('.history-item');
    historyItems.forEach(item => {
        item.addEventListener('click', function() {
            const content = this.textContent;
            console.log('查看历史对话:', content);
            // 这里可以添加恢复对话的逻辑
            document.querySelector('.chat-input').value = content.replace('...', '');
        });
    });
}

// 响应式功能
function initResponsive() {
    // 监听窗口大小变化
    window.addEventListener('resize', function() {
        adjustLayout();
    });
    
    // 初始调整
    adjustLayout();
}

function adjustLayout() {
    const width = window.innerWidth;
    const sidebar = document.querySelector('.sidebar');
    const rightSidebar = document.querySelector('.right-sidebar');
    const cardsSection = document.querySelector('.cards-section');
    
    if (width <= 768) {
        // 移动端布局
        sidebar.style.width = '60px';
        if (rightSidebar) {
            rightSidebar.style.display = 'none';
        }
        cardsSection.style.gridTemplateColumns = '1fr';
    } else if (width <= 1200) {
        // 平板布局
        sidebar.style.width = '200px';
        if (rightSidebar) {
            rightSidebar.style.display = 'none';
        }
        cardsSection.style.gridTemplateColumns = '1fr';
    } else {
        // 桌面布局
        sidebar.style.width = '200px';
        if (rightSidebar) {
            rightSidebar.style.display = 'block';
        }
        cardsSection.style.gridTemplateColumns = 'repeat(3, 1fr)';
    }
}

// 工具函数
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${type === 'error' ? '#ff4d4f' : type === 'success' ? '#52c41a' : '#1890ff'};
        color: white;
        padding: 12px 20px;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // 3秒后自动移除
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 添加动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// 模拟数据更新
function simulateDataUpdate() {
    // 模拟新的待办事项
    setTimeout(() => {
        const count = document.querySelector('.cards-section .card:first-child .count');
        count.textContent = '共 11 条记录';
        showNotification('您有新的待办事项', 'info');
    }, 5000);
    
    // 模拟订单状态更新
    setTimeout(() => {
        const firstOrder = document.querySelector('.order-item .link');
        if (firstOrder) {
            firstOrder.textContent = '已签收';
            firstOrder.style.color = '#52c41a';
            showNotification('订单状态已更新', 'success');
        }
    }, 8000);
}

// 启动数据模拟
simulateDataUpdate();