interface Blog {
  title: string;
  content: string;
  id: number;
  comments?: string[];
}

const blogList: Blog[] = [
  {
    title: "Công nghệ ReactJS",
    content: "ReactJS là 1 thư viện của Javascript dùng để xây dựng các ứng dụng single page application",
    id: 1,
  },
];

if (!JSON.parse(localStorage.getItem("blogList") as string)) {
  localStorage.setItem("blogList", JSON.stringify(blogList));
}
function addBlog(): void {
  const inputTittleElement: HTMLInputElement = document.querySelector(
    "#tittle"
  ) as HTMLInputElement;
  const inputContentElement: HTMLInputElement = document.querySelector(
    "#content"
  ) as HTMLInputElement;
  const inputTittleValue: string = inputTittleElement.value;
  const inputContentValue: string = inputContentElement.value;

  if (!inputTittleValue || !inputContentValue) {
    return alert("Tiêu đề và nội dung không được để trống.");
  }
  const dataList: Blog[] =
    JSON.parse(localStorage.getItem("blogList") as string) || [];
  const newBlog: Blog = {
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
function openModal(id: number): void {
  localStorage.setItem("currentBlogId", id.toString());
  const commentModal = document.getElementById("commentModal");
  if (commentModal) {
    commentModal.style.display = "block";
  }
}

function closeModal(): void {
  const commentModal = document.getElementById("commentModal");
  if (commentModal) {
    commentModal.style.display = "none";
  }
}

function addComment(): void {
  const commentInput: HTMLInputElement | null = document.getElementById("commentInput") as HTMLInputElement;
  const commentText: string = commentInput?.value || "";

  if (!commentText) {
    return alert("Bình luận không được để trống.");
  }

  const currentBlogId: number = parseInt(localStorage.getItem("currentBlogId") || "0");
  const dataBlog: Blog[] = JSON.parse(localStorage.getItem("blogList") as string) || [];

  const currentBlog = dataBlog.find(blog => blog.id === currentBlogId);

  if (currentBlog) {
    currentBlog.comments = currentBlog.comments || [];
    currentBlog.comments.push(commentText);

    localStorage.setItem("blogList", JSON.stringify(dataBlog));
    closeModal();
    renderBlog();
  }
}

function comment(id: number): void {
  openModal(id);
}

function renderBlog(): void {
  const dataBlog: Blog[] = JSON.parse(localStorage.getItem("blogList") as string) || [];
  const listBlog: HTMLElement | null = document.querySelector(".content-blog") ;
  if(listBlog){
  listBlog.innerHTML = "";
  dataBlog.forEach((item: Blog) => {
    const commentCount = item.comments ? item.comments.length : 0;
      listBlog.innerHTML += `
        <div class="new-content">
          <h4>${item.title}</h4>
          <p>${item.content}</p>
          <button onclick="comment(${item.id})">Bình luận</button>
          <p > ${commentCount} bình luận</p>
          <p>${item.comments?item.comments:""}</p>
        </div>
      `;
    });
  }}
renderBlog();  


