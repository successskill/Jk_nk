    const ctx = document.getElementById('performanceChart');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul'],
        datasets: [{
          data: [200,800,450,650,380,760,920],
          borderColor: '#5e17eb',
          backgroundColor: 'rgba(94,23,235,0.12)',
          fill: true, tension: 0.4
        }]
      },
      options: { plugins:{legend:{display:false}}, scales:{y:{beginAtZero:true}} }
    });