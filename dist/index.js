"use strict";
const blogList = [
    {
        title: "Công nghệ ReactJS",
        content: "ReactJS là 1 thư viện của Javascript dùng để xây dựng các ứng dụng single page application",
        id: 1,
    },
];
if (!JSON.parse(localStorage.getItem("blogList"))) {
    localStorage.setItem("blogList", JSON.stringify(blogList));
}
function addBlog() {
    const inputTittleElement = document.querySelector("#tittle");
    const inputContentElement = document.querySelector("#content");
    const inputTittleValue = inputTittleElement.value;
    const inputContentValue = inputContentElement.value;
    if (!inputTittleValue || !inputContentValue) {
        return alert("Tiêu đề và nội dung không được để trống.");
    }
    const dataList = JSON.parse(localStorage.getItem("blogList")) || [];
    const newBlog = {
        title: inputTittleValue,
        content: inputContentValue,
        id: dataList.length + 1,
    };
    dataList.push(newBlog);
    localStorage.setItem("blogList", JSON.stringify(dataList));
    renderBlog();
    inputTittleElement.value = "";
    inputContentElement.value = "";
}
function openModal(id) {
    localStorage.setItem("currentBlogId", id.toString());
    const commentModal = document.getElementById("commentModal");
    if (commentModal) {
        commentModal.style.display = "block";
    }
}
function closeModal() {
    const commentModal = document.getElementById("commentModal");
    if (commentModal) {
        commentModal.style.display = "none";
    }
}
function addComment() {
    const commentInput = document.getElementById("commentInput");
    const commentText = (commentInput === null || commentInput === void 0 ? void 0 : commentInput.value) || "";
    if (!commentText) {
        return alert("Bình luận không được để trống.");
    }
    const currentBlogId = parseInt(localStorage.getItem("currentBlogId") || "0");
    const dataBlog = JSON.parse(localStorage.getItem("blogList")) || [];
    const currentBlog = dataBlog.find(blog => blog.id === currentBlogId);
    if (currentBlog) {
        currentBlog.comments = currentBlog.comments || [];
        currentBlog.comments.push(commentText);
        localStorage.setItem("blogList", JSON.stringify(dataBlog));
        closeModal();
        renderBlog();
    }
}
function comment(id) {
    openModal(id);
}
function renderBlog() {
    const dataBlog = JSON.parse(localStorage.getItem("blogList")) || [];
    const listBlog = document.querySelector(".content-blog");
    if (listBlog) {
        listBlog.innerHTML = "";
        dataBlog.forEach((item) => {
            const commentCount = item.comments ? item.comments.length : 0;
            listBlog.innerHTML += `
        <div class="new-content">
          <h4>${item.title}</h4>
          <p>${item.content}</p>
          <button onclick="comment(${item.id})">Bình luận</button>
          <p > ${commentCount} bình luận</p>
          <p>${item.comments ? item.comments : ""}</p>
        </div>
      `;
        });
    }
}
renderBlog();
