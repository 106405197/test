document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // Intersection Observer for scroll animations
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Optional: unobserve after revealing
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".blur-in").forEach((element) => {
    observer.observe(element);
  });
});

// AI Chatbot Logic
document.addEventListener("DOMContentLoaded", () => {
  const chatToggleBtn = document.getElementById("chat-toggle");
  const chatContainer = document.getElementById("chat-container");
  const closeChatBtn = document.getElementById("close-chat");
  const chatInput = document.getElementById("chat-input");
  const sendChatBtn = document.getElementById("send-chat");
  const chatMessages = document.getElementById("chat-messages");

  // Toggle chat visibility
  if (chatToggleBtn && chatContainer) {
    chatToggleBtn.addEventListener("click", () => {
      chatContainer.classList.add("active");
      if (chatInput) chatInput.focus();
    });

    closeChatBtn.addEventListener("click", () => {
      chatContainer.classList.remove("active");
    });
  }

  // Function to add a message to the chat
  function appendMessage(text, sender) {
    if (!chatMessages) return;
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");
    messageDiv.classList.add(sender === "user" ? "user-message" : "ai-message");
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Function to show typing indicator
  function showTyping() {
    if (!chatMessages) return;
    const typingDiv = document.createElement("div");
    typingDiv.classList.add("typing-indicator");
    typingDiv.id = "typing-indicator";
    typingDiv.innerHTML =
      '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Function to remove typing indicator
  function removeTyping() {
    const typingDiv = document.getElementById("typing-indicator");
    if (typingDiv) {
      typingDiv.remove();
    }
  }

  // Send message to backend
  async function sendMessage() {
    if (!chatInput) return;
    const text = chatInput.value.trim();
    if (!text) return;

    // Display user message
    appendMessage(text, "user");
    chatInput.value = "";

    // Show typing animation
    showTyping();

    setTimeout(() => {
      removeTyping();
      appendMessage("網路連線錯誤，無法連線至伺服器。", "ai");
    }, 1000);
  }

  // Send on button click
  if (sendChatBtn) {
    sendChatBtn.addEventListener("click", sendMessage);
  }

  // Send on Enter key press
  if (chatInput) {
    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        sendMessage();
      }
    });
  }
});
