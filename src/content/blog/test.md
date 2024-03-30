---
title: First blog post
description: This is my first blog post
category: dev
publicationDate: 2024-03-20
tags: [dev, typescript]
ogImage: ./meta/og.png
---

Hello this is a test

## This is a title

```javascript
function Example() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = `You clicked ${count} times`;
    });

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
        </div>
    );
}
```
