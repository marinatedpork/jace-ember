export default function() {

  const duration = 500;

  this.transition(
    this.childOf('users'),
    this.use('explode', {
      matchBy: 'data-user-id',
      use: ['flyTo', { duration, [250, 15]}]
    })
  );
  
}