import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Supabase Client Initialization
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Common Section Component
const Section = ({ id, children, className = "" }) => {
  return (
    <section id={id} className={`section ${className}`}>
      {children}
    </section>
  );
};

function App() {
  const [guestMessages, setGuestMessages] = useState([]);
  const [newMessage, setNewMessage] = useState({ name: '', msg: '' });

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Update: Fetch messages from Supabase
  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Failed to fetch messages:', error);
      } else {
        setGuestMessages(data || []);
      }
    };
    fetchMessages();
  }, []);

  const handleAddMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.name || !newMessage.msg) return;

    try {
      const { data, error } = await supabase
        .from('messages')
        .insert([{ name: newMessage.name, msg: newMessage.msg }])
        .select();

      if (error) throw error;
      
      if (data) {
        setGuestMessages([data[0], ...guestMessages]);
        setNewMessage({ name: '', msg: '' });
      }
    } catch (err) {
      console.error('Failed to post message:', err);
    }
  };

  // Kakao Map Initialization (Robust)
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=ff09b5f692fad0cbbb8e690ace21f9c7&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(35.8551337, 128.6244966),
          level: 3
        };
        const map = new window.kakao.maps.Map(container, options);

        const markerPosition = new window.kakao.maps.LatLng(35.8551337, 128.6244966);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition
        });
        marker.setMap(map);
      });
    };
  }, []);

  const images = [
    '/웨딩1.jpg', '/웨딩3.jpg', '/웨딩4.jpg', '/웨딩5.jpg', '/웨딩6.jpg', 
    '/웨딩7.jpg', '/웨딩8.jpg', '/웨딩9.jpg', '/웨딩10.jpg', '/웨딩11.jpg',
    '/웨딩12.jpg', '/웨딩13.jpg', '/웨딩15.jpg', '/웨딩18.jpg', '/웨딩19.jpg',
    '/남편.jpg', '/신부.jpg', '/같이1.jpg', '/같이2.jpg'
  ];

  return (
    <div className="app-container">
      {/* 1. Intro Section */}
      <Section id="intro" className="intro fade-in">
        <div className="main-image-container">
          <img src="/웨딩1.jpg" alt="메인 사진" className="main-photo" />
        </div>
        <div className="intro-content serif">
          <p className="date-top">2024. 09. 21. SAT PM 02:00</p>
          <h1 className="names">김현수 & 박지영</h1>
          <p className="venue">호텔 라온제나, 5층 그랜드홀</p>
        </div>
      </Section>

      {/* 2. Greeting Section */}
      <Section id="greeting" className="fade-in">
        <h2 className="serif">모시는 글</h2>
        <div className="greeting-text">
          <p>서로가 마주 보며 다진</p>
          <p>깊은 믿음으로</p>
          <p>사랑의 결실을 보려 합니다.</p>
          <br/>
          <p>함께 걸어갈 저희의 첫 걸음에</p>
          <p>귀한 걸음 하시어</p>
          <p>축복해 주시면 감사하겠습니다. ❤️</p>
        </div>
        <div className="parents serif">
          <p>김철수 · 이영희 <span className="relation">의 장남</span> <b>현수</b></p>
          <p>박민호 · 최선아 <span className="relation">의 장녀</span> <b>지영</b></p>
        </div>
      </Section>

      {/* 2-1. Profile Section */}
      <Section id="profile" className="fade-in">
        <div className="section-title-eng">GROOM & BRIDE</div>
        <h2 className="serif">신랑 & 신부를 소개합니다</h2>
        
        <div className="profile-container">
          <div className="profile-card">
            <div className="profile-image">
              <img src="/남편.jpg" alt="신랑 프로필" />
            </div>
            <div className="profile-info">
              <span className="label groom">신랑</span>
              <h3 className="name">김현수</h3>
              <p className="description">
                매사에 신중하고 듬직한 성격입니다.<br/>
                저를 항상 응원해주고 변화에 용기를 주는<br/>
                지영이와 함께할 때 생기는 긍정적인 에너지 덕분에<br/>
                평생을 함께하고 싶다는 확신을 갖게 되었습니다.
              </p>
            </div>
          </div>

          <div className="profile-card">
            <div className="profile-image">
              <img src="/신부.jpg" alt="신부 프로필" />
            </div>
            <div className="profile-info">
              <span className="label bride">신부</span>
              <h3 className="name">박지영</h3>
              <p className="description">
                직접 먼저 용기를 내어 다가갔던 그날을 기억합니다.<br/>
                6년이라는 시간 동안 한결같이 저를 사랑해주고<br/>
                아껴주는 현수 씨와 함께라면,<br/>
                어떤 미래도 행복하게 그려나갈 수 있을 것 같습니다.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* 2-2. Our Story Section */}
      <Section id="story" className="fade-in">
        <div className="section-title-eng">OUR STORY</div>
        <h2 className="serif">예상하지 못했던 첫 만남</h2>
        
        <div className="story-content">
          <div className="story-item">
            <p className="story-text">
              2018년 9월, 우리는 수영장에서<br/>
              선생님과 제자로 처음 만났습니다.
            </p>
            <div className="story-image">
              <img src="/같이1.jpg" alt="스토리 사진" />
            </div>
            <p className="story-text sub">
              "꾸밀 수 없는 공간"에서 서로의 가장 자연스러운 모습을 보며<br/>
              우리는 조금씩 가까워졌습니다.
            </p>
          </div>
          
          <div className="story-item">
            <div className="story-image">
              <img src="/같이2.jpg" alt="스토리 사진" />
            </div>
            <p className="story-text">
              닮아가는 우리, 이제는 서로의 취미가 되고<br/>
              일상이 된 두 사람의 따뜻한 이야기.<br/>
              그 소중한 시작에 여러분을 초대합니다.
            </p>
          </div>
        </div>
      </Section>

      {/* 3. Calendar Section */}
      <Section id="calendar" className="fade-in">
        <h2 className="serif">9월 21일</h2>
        <div className="calendar-grid">
          {/* Simple static calendar for demonstration */}
          <div className="calendar-header">
            <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
          </div>
          <div className="calendar-days">
            {[...Array(30)].map((_, i) => (
              <div key={i} className={`day ${i + 1 === 21 ? 'selected' : ''}`}>
                {i + 1}
              </div>
            ))}
          </div>
        </div>
        <div className="d-day serif">
          저희 결혼식이 <b>예식 종료</b> 되었습니다.
        </div>
      </Section>

      {/* 4. Gallery Section */}
      <Section id="gallery" className="fade-in">
        <h2 className="serif">GALLERY</h2>
        <div className="gallery-grid">
          {images.map((src, idx) => (
            <div key={idx} className="gallery-item">
              <img src={src} alt={`웨딩사진 ${idx+1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </Section>

      {/* 5. Location Section */}
      <Section id="location" className="fade-in">
        <h2 className="serif">LOCATION</h2>
        <div id="map" className="map-view">
           {/* 카카오맵이 로드됩니다 */}
        </div>
        <div className="location-info serif">
          <h3>호텔 라온제나 5층 그랜드홀</h3>
          <p>대구광역시 수성구 범어천로 73</p>
          <p>053-123-4567</p>
        </div>
        <div className="nav-buttons">
          <button className="nav-btn kakao">카카오 맵으로 보기</button>
        </div>
      </Section>

      {/* 6. Account Information */}
      <Section id="account" className="fade-in">
        <h2 className="serif">마음 전하실 곳</h2>
        <div className="account-container">
          <div className="account-box">
            <p>신랑 김현수</p>
            <div className="account-row">
              <span>신한 110-123-456789</span>
              <button className="copy-btn">복사</button>
            </div>
          </div>
          <div className="account-box">
            <p>신부 박지영</p>
            <div className="account-row">
              <span>국민 123456-04-123456</span>
              <button className="copy-btn">복사</button>
            </div>
          </div>
        </div>
      </Section>

      {/* 7. RSVP / Guestbook */}
      <Section id="guestbook" className="fade-in guestbook-section">
        <div className="section-title-eng">GUEST BOOK</div>
        <h2 className="serif">축하의 한 마디</h2>
        
        <form className="guestbook-form" onSubmit={handleAddMessage}>
          <div className="input-row">
            <input 
              type="text" 
              placeholder="To. 현수 & 지영" 
              disabled
              className="to-input"
            />
          </div>
          <div className="input-group">
            <input 
              type="text" 
              placeholder="성함" 
              value={newMessage.name} 
              onChange={e => setNewMessage({...newMessage, name: e.target.value})}
              required
            />
            <textarea 
              placeholder="축하 메시지를 남겨주세요"
              value={newMessage.msg}
              onChange={e => setNewMessage({...newMessage, msg: e.target.value})}
              required
            />
          </div>
          <button type="submit" className="button write-btn">축하 메시지 작성하기</button>
        </form>

        <div className="message-list">
          {guestMessages.map(m => (
            <div key={m.id} className="message-card">
              <div className="card-header">
                <span className="to-whom">To. 현수 & 지영</span>
                <span className="msg-date">{new Date(m.created_at).toLocaleDateString()}</span>
              </div>
              <p className="msg-content">"{m.msg}"</p>
              <div className="card-footer">
                <span className="from-whom">From. <b>{m.name}</b></span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Floating Bottom Bar */}
      <div className="bottom-bar">
        <button className="bar-btn">참석 가능 여부 전달</button>
        <button className="bar-btn">장소 확인</button>
        <button className="bar-btn">축하 메시지</button>
      </div>

      <style>{`
        :root {
          --primary-bg: #fdfaf6;
          --accent-lavender: #d1c4e9;
          --deep-text: #3e3e3e;
          --soft-text: #8b8b8b;
          --white: #ffffff;
        }

        .app-container {
          background-color: var(--primary-bg);
          padding-bottom: 90px;
          min-height: 100vh;
        }

        section {
          max-width: 480px;
          margin: 0 auto;
          padding: 80px 30px;
          background: var(--white);
          margin-bottom: 8px;
          box-shadow: 0 4px 30px rgba(0,0,0,0.02);
        }

        h2 {
          font-size: 1.4rem;
          color: #7c4dff;
          margin-bottom: 2.5rem;
          font-weight: 500;
        }

        .intro {
          padding: 0;
          background: transparent;
          margin-bottom: 0;
        }

        .main-image-container {
          position: relative;
          width: 100%;
          overflow: hidden;
          border-bottom-left-radius: 40px;
          border-bottom-right-radius: 40px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
        }

        .main-photo {
          width: 100%;
          display: block;
          transition: transform 10s ease;
        }

        .intro-content {
          padding: 60px 20px;
          background: transparent;
          text-align: center;
        }

        .names {
          font-size: 2.6rem;
          margin: 20px 0;
          color: var(--deep-text);
          font-weight: 400;
          letter-spacing: -0.02em;
        }

        .date-top {
          font-size: 0.95rem;
          color: var(--soft-text);
          letter-spacing: 0.25rem;
          text-transform: uppercase;
        }

        .greeting-text {
          font-size: 1.05rem;
          line-height: 2.2;
          margin-bottom: 50px;
          color: #555;
        }

        .parents {
          border-top: 1px solid #f0f0f0;
          padding-top: 40px;
          font-size: 1.15rem;
          color: #444;
        }
        
        .relation {
          font-size: 0.85rem;
          color: #bbb;
          margin: 0 8px;
        }

        .calendar-grid {
          max-width: 320px;
          margin: 0 auto;
          padding: 20px;
          background: #fafafa;
          border-radius: 20px;
        }

        .calendar-header {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          color: #d1c4e9;
          font-weight: bold;
          margin-bottom: 15px;
          font-size: 0.85rem;
        }

        .calendar-days {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 8px;
        }

        .day {
          aspect-ratio: 1/1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.95rem;
          color: #666;
        }

        .day.selected {
          background: #7c4dff;
          border-radius: 50%;
          color: white;
          box-shadow: 0 4px 15px rgba(124, 77, 255, 0.3);
        }

        .d-day {
          margin-top: 40px;
          font-size: 1.1rem;
          color: #7c4dff;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
        }

        .gallery-item img {
          width: 100%;
          aspect-ratio: 1/1;
          object-fit: cover;
          border-radius: 8px;
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .gallery-item:hover img {
          transform: scale(1.05);
        }

        .map-view {
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          height: 350px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 20px;
          margin-bottom: 30px;
          color: #777;
          border: 1px solid #eee;
        }

        .nav-buttons {
          display: flex;
          justify-content: center;
          margin-top: 30px;
        }

        .nav-btn {
          width: 200px;
          padding: 15px;
          border: 1px solid #7c4dff;
          color: #7c4dff;
          background: #fff;
          border-radius: 30px;
          font-size: 0.9rem;
          font-weight: 600;
          box-shadow: 0 4px 15px rgba(124, 77, 255, 0.1);
          cursor: pointer;
        }

        .account-box {
          background: var(--primary-bg);
          padding: 30px;
          margin-bottom: 20px;
          border-radius: 20px;
          text-align: left;
          border: 1px solid #f1ece6;
        }

        .account-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 10px;
          font-size: 1rem;
        }

        .copy-btn {
          border: none;
          padding: 6px 14px;
          font-size: 0.8rem;
          background: #7c4dff;
          color: white;
          border-radius: 20px;
          cursor: pointer;
        }

        .guestbook-form input, .guestbook-form textarea {
          padding: 16px;
          border: 1px solid #f0f0f0;
          background: #f9f9f9;
          border-radius: 15px;
          margin-bottom: 12px;
          font-size: 1rem;
        }

        .message-item {
          padding: 25px 0;
          border-bottom: 1px solid #f8f8f8;
        }

        .bottom-bar {
          position: fixed;
          bottom: 25px;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 50px);
          max-width: 430px;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(15px);
          display: flex;
          justify-content: space-around;
          padding: 18px;
          border-radius: 40px;
          box-shadow: 0 15px 45px rgba(0,0,0,0.12);
          z-index: 1000;
          border: 1px solid rgba(255,255,255,0.3);
        }

        .bar-btn {
          color: #7c4dff;
          font-weight: 600;
          font-size: 0.9rem;
        }

        /* Section Titles */
        .section-title-eng {
          font-family: serif;
          font-size: 0.8rem;
          color: #e1bee7;
          letter-spacing: 0.3rem;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
        }

        /* Profile Cards */
        .profile-container {
          display: flex;
          flex-direction: column;
          gap: 40px;
          margin-top: 20px;
        }

        .profile-card {
          text-align: center;
        }

        .profile-image img {
          width: 80%;
          max-width: 250px;
          border-radius: 20px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.05);
          margin-bottom: 20px;
          aspect-ratio: 3/4;
          object-fit: cover;
        }

        .label {
          display: inline-block;
          font-size: 0.8rem;
          padding: 2px 10px;
          border-radius: 10px;
          margin-bottom: 10px;
          font-weight: 600;
        }

        .label.groom { color: #5c6bc0; background: #e8eaf6; }
        .label.bride { color: #ec407a; background: #fce4ec; }

        .profile-info .name {
          font-size: 1.4rem;
          margin-bottom: 15px;
          color: #333;
        }

        .profile-info .description {
          font-size: 0.95rem;
          line-height: 1.8;
          color: #666;
        }

        /* Our Story */
        .story-content {
          display: flex;
          flex-direction: column;
          gap: 50px;
        }

        .story-item {
          text-align: center;
        }

        .story-text {
          font-size: 1.05rem;
          line-height: 2;
          color: #444;
          margin-bottom: 25px;
        }

        .story-text.sub {
          font-size: 0.9rem;
          color: #888;
          margin-top: 25px;
        }

        .story-image img {
          width: 100%;
          border-radius: 15px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }

        /* Guestbook Redesign */
        .guestbook-section {
          background-color: #fdfaf6;
        }

        .input-row { margin-bottom: 10px; }
        .to-input {
          width: 100%;
          border: none !important;
          background: transparent !important;
          color: #8b8b8b;
          font-weight: 500;
          padding-left: 0 !important;
          font-size: 1.1rem !important;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .write-btn {
          width: 100%;
          padding: 18px;
          background: #7c4dff;
          color: white;
          border: none;
          border-radius: 15px;
          font-size: 1rem;
          font-weight: 600;
          margin-top: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .write-btn:hover {
          background: #6200ea;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(124, 77, 255, 0.4);
        }

        .message-card {
          background: white;
          padding: 25px;
          border-radius: 20px;
          margin-top: 20px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.03);
          border: 1px solid #f0f0f0;
          text-align: left;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          color: #bbb;
          margin-bottom: 15px;
        }

        .msg-content {
          font-size: 1rem;
          line-height: 1.7;
          color: #444;
          margin-bottom: 15px;
        }

        .card-footer {
          text-align: right;
          font-size: 0.9rem;
          color: #888;
        }

        .card-footer b { color: #333; }

        .fade-in {
          opacity: 0;
          transform: translateY(30px);
          transition: all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}

export default App;
