"use strict";

document.addEventListener("DOMContentLoaded", () => {
  getSVGSprites();
  summaryDeleteTitle();
  toc();
});

//如果存在目录，添加目录交互
const toc = () => {
  const tocContainer = document.getElementById("TableOfContents");
  if (tocContainer !== null) {
    const activeClass = "text-sky-400";
    tocInit(activeClass);
    tocScrolling(activeClass);
  }
};
//首个目录项添加默认激活状态
const tocInit = (activeClass) => {
  const tocContainer = document.getElementById("TableOfContents");
  tocContainer.querySelector("li").classList.add(activeClass);
};
//处理滚动时的目录交互
const tocScrolling = (activeClass) => {
  const sections = document.querySelectorAll("h2,h3");
  window.onscroll = () => {
    const scrollPos =
      document.documentElement.scrollTop || document.body.scrollTop;
    for (let section of sections) {
      if (section.offsetTop <= scrollPos) {
        const id = section.id;
        const activeElement = document.querySelector(`.${activeClass}`);
        activeElement?.classList.remove(activeClass);
        document
          .querySelector(`a[href*=${id}]`)
          .parentNode.classList.add(activeClass);
      }
    }
  };
};

//删除预览中的h2元素以降低对于预览格式的困扰
const summaryDeleteTitle = () => {
  const summaries = document.querySelectorAll(".summary-item");
  for (let summary of summaries) {
    summary.querySelector("h2")?.remove();
  }
};

//加载SVG Sprites
const getSVGSprites = () => {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "https://static.fori.fun/blog/theme/sprites.svg", true);
  xhr.onload = () => {
    document.body.insertAdjacentHTML(
      "afterBegin",
      '<div style="display:none;">' + xhr.responseText + "</div>"
    );
  };
  xhr.send();
};
